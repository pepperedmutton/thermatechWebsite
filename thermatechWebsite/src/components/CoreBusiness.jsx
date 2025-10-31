// src/components/CoreBusiness.jsx
import React from 'react';

// 1. 导入 CSS Module (保持不变)
import styles from './CoreBusiness.module.css';

// 2. 导入您的背景图 (已更正为 .png)
import coreBg from '../assets/images/core-business-bg.png'; // <-- 已更正

export default function CoreBusiness() {
  return (
    // 3. 应用来自 CSS 模块的 'wrapper' 类 (保持不变)
    <div 
      className={styles.wrapper} 
      style={{ backgroundImage: `url(${coreBg})` }}
    >
      
      {/* 4. 应用 'textContainer' 类 (保持不变) */}
      <div className={styles.textContainer}>
        <h2>聚焦低温等离子体技术</h2>
        <p>
          星焓科技（北京）有限公司深耕低温等离子体领域，
          致力于提供从**技术研发**、**产品生产**、**市场销售**到**专业服务**的全链条解决方案。
          我们赋能科研机构和工业应用，推动等离子体技术的创新与发展。
        </p>
      </div>

      {/* 5. 应用 'pointsGrid' 类 (保持不变) */}
      <div className={styles.pointsGrid}>
        
        {/* 6. 应用 'pointItem' 类 (保持不变) */}
        <div className={styles.pointItem}>
          <h3><i className="fas fa-flask"></i> 技术研发</h3>
          <p>持续投入前沿技术研究，掌握核心知识产权。</p>
        </div>
        
        <div className={styles.pointItem}>
          <h3><i className="fas fa-industry"></i> 产品生产</h3>
          <p>从探针到分析仪，高精度设备严格质控。</p>
        </div>
        
        <div className={styles.pointItem}>
          <h3><i className="fas fa-chart-line"></i> 市场销售</h3>
          <p>覆盖国内外市场，提供灵活的采购方案。</p>
        </div>
        
        <div className={styles.pointItem}>
          <h3><i className="fas fa-headset"></i> 专业服务</h3>
          <p>定制化解决方案，全方位技术支持。</p>
        </div>

      </div>
      
    </div>
  );
}