import React from 'react';
import ProductDetail from './components/ProductDetail';
import styles from './ProductDetailPage.module.css';

export default function TorsionBalancePage() {
  const details = {
      title: '扭摆式推力计',
      overview: '扭摆式推力计是一种高灵敏度的微推力测量装置，其基本原理是将待测推力器安装在一个可绕垂直轴自由转动的摆臂上，推力产生的力矩与扭转纤维或枢轴的恢复力矩相平衡。通过精确测量摆臂的微小转动角度，可以反推出推力的大小。',
    features: [
      '极高的灵敏度和分辨率，适用于测量μN到mN量级的稳态或缓变推力',
      '结构相对简单，技术成熟，测量结果可靠',
      '通过静电或电磁力进行原位标定，保证测量精度',
      '可配备热补偿系统，减小推力器热效应对测量结果的影响',
      '适用于真空环境，是电推进推力测量的常用方案',
    ],
      specs: [
        ['推力范围', '1 μN – 100 mN', '可定制'],
        ['分辨率', '优于 1% 满量程', '典型值，取决于传感与读出链路'],
        ['位移/角度传感器', '激光干涉 / 差分电容 / LVDT', '可选配置'],
        ['标定方式', '静电梳齿 / 电磁线圈 / 砝码', '支持原位标定'],
        ['真空兼容性', '高真空 (< 10^-3 Pa)', '适配真空平台'],
      ],
    galleryImages: []
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <ProductDetail {...details} />
      </div>
    </div>
  );
}
