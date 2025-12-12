// src/utils/mathRenderer.jsx
import React from 'react';
import { InlineMath } from 'react-katex';

/**
 * 解析文本中的数学公式并渲染
 * 支持两种模式:
 * 1. 括号包围: "电子密度 (n_e)" → "电子密度 (<InlineMath>n_e</InlineMath>)"
 * 2. 独立符号: "n_e, T_e, V_p" → "<InlineMath>n_e</InlineMath>, <InlineMath>T_e</InlineMath>, <InlineMath>V_p</InlineMath>"
 */
export function renderTextWithMath(text) {
  if (!text || typeof text !== 'string') return text;
  
  // 组合正则表达式：匹配括号内的数学符号 或 独立的数学变量
  // 模式1: (n_e) 或 (VDF / IVDF)
  // 模式2: n_e, T_e, V_p, EEDF 等（前后是单词边界或逗号/空格）
  const combinedPattern = /\(([A-Za-z_]+(?:\s*\/\s*[A-Za-z_]+)*)\)|(?<=^|[\s,，、；;]|[^\w])([A-Za-z]+_[A-Za-z0-9]+|EEDF|IVDF|VDF|IEDF)(?=$|[\s,，、；;]|[^\w])/g;
  
  const parts = [];
  let lastIndex = 0;
  let match;
  let keyCounter = 0;
  
  while ((match = combinedPattern.exec(text)) !== null) {
    // 添加数学符号前的文本
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    
    // match[1] 是括号内的内容，match[2] 是独立的数学变量
    const inParens = match[1];
    const standalone = match[2];
    
    if (inParens) {
      // 括号内的数学符号 - 保留括号
      parts.push(
        <React.Fragment key={`math-${keyCounter++}`}>
          (<InlineMath>{inParens.replace(/\s/g, '')}</InlineMath>)
        </React.Fragment>
      );
    } else if (standalone) {
      // 独立的数学变量 - 不添加括号
      parts.push(
        <InlineMath key={`math-${keyCounter++}`}>{standalone}</InlineMath>
      );
    }
    
    lastIndex = match.index + match[0].length;
  }
  
  // 添加剩余文本
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
}
