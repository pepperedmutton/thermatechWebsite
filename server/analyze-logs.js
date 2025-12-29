#!/usr/bin/env node
/**
 * PM2 日志地理位置分析工具
 * 用途：分析 PM2 日志中的访问者地理位置分布
 * 使用：node analyze-logs.js [日志文件路径]
 */

const fs = require('fs');
const path = require('path');

// 默认日志路径（根据实际 PM2 配置调整）
const DEFAULT_LOG_PATH = path.join(process.env.HOME || process.env.USERPROFILE, '.pm2/logs/starthermatech-server-out.log');

function parseLog(logContent) {
  const lines = logContent.split('\n');
  const stats = {
    totalRequests: 0,
    byCountry: {},
    byRegion: {},
    byCity: {},
    byPath: {},
    byIp: {},
    unknownIps: 0,
    localIps: 0,
  };

  const ipRegex = /\| IP: ([^\|]+) \|/;
  const pathRegex = /\] (GET|POST|PUT|DELETE|PATCH) ([^\s\|]+)/;

  lines.forEach(line => {
    if (!line.includes('| IP:')) return;

    stats.totalRequests++;

    // 提取 IP 信息
    const ipMatch = line.match(ipRegex);
    if (ipMatch) {
      const geoInfo = ipMatch[1].trim();
      
      if (geoInfo === 'Local') {
        stats.localIps++;
      } else if (geoInfo.startsWith('Unknown')) {
        stats.unknownIps++;
      } else {
        // 解析格式：CN-ZJ-Hangzhou(223.5.5.5) 或 CN(114.114.114.114)
        const match = geoInfo.match(/^([^(]+)\(([^)]+)\)$/);
        if (match) {
          const location = match[1];
          const ip = match[2];
          const parts = location.split('-');

          // 统计 IP 访问次数
          stats.byIp[ip] = (stats.byIp[ip] || 0) + 1;

          // 统计国家
          if (parts[0]) {
            stats.byCountry[parts[0]] = (stats.byCountry[parts[0]] || 0) + 1;
          }

          // 统计地区
          if (parts[1]) {
            const region = `${parts[0]}-${parts[1]}`;
            stats.byRegion[region] = (stats.byRegion[region] || 0) + 1;
          }

          // 统计城市
          if (parts[2]) {
            const city = parts.join('-');
            stats.byCity[city] = (stats.byCity[city] || 0) + 1;
          }
        }
      }
    }

    // 提取访问路径
    const pathMatch = line.match(pathRegex);
    if (pathMatch) {
      const method = pathMatch[1];
      const urlPath = pathMatch[2];
      const key = `${method} ${urlPath}`;
      stats.byPath[key] = (stats.byPath[key] || 0) + 1;
    }
  });

  return stats;
}

function sortByValue(obj) {
  return Object.entries(obj)
    .sort((a, b) => b[1] - a[1]);
}

function printStats(stats) {
  console.log('\n=== PM2 日志地理位置分析报告 ===\n');
  
  console.log(`📊 总请求数: ${stats.totalRequests}`);
  console.log(`🏠 本地访问: ${stats.localIps} (${(stats.localIps / stats.totalRequests * 100).toFixed(1)}%)`);
  console.log(`❓ 未知位置: ${stats.unknownIps} (${(stats.unknownIps / stats.totalRequests * 100).toFixed(1)}%)`);
  console.log('');

  // Top 10 国家
  console.log('🌍 访问量 Top 10 国家：');
  sortByValue(stats.byCountry)
    .slice(0, 10)
    .forEach(([country, count], index) => {
      const percentage = (count / stats.totalRequests * 100).toFixed(1);
      console.log(`  ${index + 1}. ${country.padEnd(10)} ${count.toString().padStart(6)} 次 (${percentage}%)`);
    });
  console.log('');

  // Top 10 地区
  if (Object.keys(stats.byRegion).length > 0) {
    console.log('🏙️  访问量 Top 10 地区：');
    sortByValue(stats.byRegion)
      .slice(0, 10)
      .forEach(([region, count], index) => {
        const percentage = (count / stats.totalRequests * 100).toFixed(1);
        console.log(`  ${index + 1}. ${region.padEnd(15)} ${count.toString().padStart(6)} 次 (${percentage}%)`);
      });
    console.log('');
  }

  // Top 10 城市
  if (Object.keys(stats.byCity).length > 0) {
    console.log('🏢 访问量 Top 10 城市：');
    sortByValue(stats.byCity)
      .slice(0, 10)
      .forEach(([city, count], index) => {
        const percentage = (count / stats.totalRequests * 100).toFixed(1);
        console.log(`  ${index + 1}. ${city.padEnd(25)} ${count.toString().padStart(6)} 次 (${percentage}%)`);
      });
    console.log('');
  }

  // Top 10 访问路径
  console.log('🔗 访问量 Top 10 路径：');
  sortByValue(stats.byPath)
    .slice(0, 10)
    .forEach(([path, count], index) => {
      console.log(`  ${index + 1}. ${path.padEnd(40)} ${count.toString().padStart(6)} 次`);
    });
  console.log('');

  // Top 10 IP
  console.log('💻 访问量 Top 10 IP：');
  sortByValue(stats.byIp)
    .slice(0, 10)
    .forEach(([ip, count], index) => {
      console.log(`  ${index + 1}. ${ip.padEnd(20)} ${count.toString().padStart(6)} 次`);
    });
  console.log('');

  console.log('=== 分析完成 ===\n');
}

// 主程序
const logPath = process.argv[2] || DEFAULT_LOG_PATH;

if (!fs.existsSync(logPath)) {
  console.error(`日志文件不存在: ${logPath}`);
  console.error('使用方法: node analyze-logs.js [日志文件路径]');
  process.exit(1);
}

const logContent = fs.readFileSync(logPath, 'utf8');
const stats = parseLog(logContent);
printStats(stats);
