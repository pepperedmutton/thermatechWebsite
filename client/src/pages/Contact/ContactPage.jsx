// src/pages/ContactPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Contact from './components/Contact';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>联系我们 | 星焓科技</title>
        <meta
          name="description"
          content="通过留言表单或服务热线 18519685090、邮箱 bd@starthermatech.com 与星焓科技取得联系，咨询等离子体诊断与电推进相关产品与技术支持。"
        />
        <meta
          name="keywords"
          content="联系我们,技术支持,产品咨询,等离子体诊断,电推进"
        />
      </Helmet>
      <section id="contact" style={{ paddingTop: '80px' }}>
        <Contact />
      </section>
    </>
  );
}
