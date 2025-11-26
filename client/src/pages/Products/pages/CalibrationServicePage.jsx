import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProductDetail from './components/ProductDetail';
import styles from './ProductDetailPage.module.css';

export default function CalibrationServicePage() {
  const details = {
    title: '数据处理与标定服务',
    overview: '我们不仅提供先进的推力测量设备，还提供从测试方案设计、数据采集、信号处理到最终不确定度分析的全套技术服务。我们的专家团队将协助您正确解读推力数据，排除干扰，并提供符合国际标准的完整测试与标定报告。',
    features: [
      '定制化测试方案设计，满足不同推力器的测试需求',
      '基于系统辨识的推力计动态模型建立与参数标定',
      '原始数据处理，包括滤波、去噪、热漂移补偿等',
      '完整的GUM（Guide to the Expression of Uncertainty in Measurement）不确定度分析',
      '提供详细的测试报告，包括测试设置、原始数据、处理结果和不确定度预算',
      '可提供数据处理脚本（如 MATLAB/Python）和技术培训',
    ],
    specs: [
      ['服务内容', '测试方案设计、数据处理、不确定度分析、报告撰写', '可选脚本与培训'],
      ['遵循标准', 'GUM (ISO/IEC 98-3)', '可生成符合标准的报告与证书'],
      ['交付物', '测试报告、标定证书、处理脚本（选项）', '电子与纸质版本均可'],
      ['适用对象', '微推力器研发单位、高校与科研院所', '面向研发与认证场景'],
      ['核心优势', '物理建模与不确定度分析', '经验丰富的工程团队支持'],
    ],
    galleryImages: []
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <Helmet>
          <title>推力计标定与数据处理服务｜不确定度分析 | 星焓科技</title>
          <meta
            name="description"
            content="星焓科技提供推力计测试方案设计、数据处理与 GUM 不确定度分析，交付标定证书与完整报告，可提供 MATLAB/Python 脚本与培训，适用于微推力器研发、高校与科研院所的推力测量与认证。"
          />
        </Helmet>
        <ProductDetail {...details} />
      </div>
    </div>
  );
}
