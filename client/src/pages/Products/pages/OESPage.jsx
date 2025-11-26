import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProductDetail from './components/ProductDetail';
import styles from './ProductDetailPage.module.css';

export default function OESPage() {
  const oesDetails = {
    title: '发射光谱（OES）',
    overview: '发射光谱法（Optical Emission Spectroscopy, OES）是一种非侵入式等离子体诊断技术，通过分析等离子体自发光的光谱来获取其内部信息。该技术无需向等离子体中引入任何探头，因此不会对等离子体造成干扰，适用于各种工艺环境的在线监测与基础研究。',
    features: [
      '非侵入式测量，不干扰等离子体状态',
      '可识别等离子体中的粒子种类（原子、分子、离子）',
      '通过谱线强度比或与模型拟合，可估算电子温度、激发温度和粒子相对密度',
      '实时性好，可用于工艺过程的终点检测与质量控制',
      '设备相对简单，成本较低，易于集成',
    ],
    specs: [
      ['波长范围', '200 – 1100 nm', '可根据需求定制'],
      ['光谱分辨率', '优于 0.1 nm', '取决于光栅与缝宽'],
      ['探测器类型', '高灵敏度 CCD / CMOS', '线阵或面阵均可'],
      ['光纤接口', 'SMA905', '标配光纤接口，便于现场集成'],
      ['软件功能', '谱线识别、强度分析、温度估算、数据导出', '支持 CSV/Excel 导出与自动报告'],
    ],
    galleryImages: []
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <Helmet>
          <title>发射光谱 OES</title>
          <meta
            name="description"
            content="星焓科技 OES 发射光谱系统覆盖 200–1100 nm，非侵入式识别粒子种类并估算电子/激发温度与密度，支持 SMA 光纤接口、0.1 nm 级分辨率、谱线识别与自动报告，适用于工艺监测与基础研究。"
          />
        </Helmet>
        <ProductDetail {...oesDetails} />
      </div>
    </div>
  );
}
