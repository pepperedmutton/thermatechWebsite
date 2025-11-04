import React, { useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert('已收到您的留言，我们会尽快与您联系。');
    setForm({ name: '', phone: '', email: '', message: '' });
  }

  return (
    <section className={styles.wrap} aria-labelledby="contact-title">
      <div className={styles.inner}>
        <h2 id="contact-title" className={styles.title}>
          联系我们 <span className={styles.subtitle}>CONTACT&nbsp;US</span>
        </h2>

        <div className={styles.grid}>
          {/* 表单 */}
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label className={styles.label}>
              <span>您的姓名</span>
              <input
                className={styles.input}
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </label>

            <label className={styles.label}>
              <span>您的电话</span>
              <input
                className={styles.input}
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
            </label>

            <label className={styles.label}>
              <span>您的邮箱</span>
              <input
                className={styles.input}
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </label>

            <label className={styles.label}>
              <span>留言内容</span>
              <textarea
                className={styles.textarea}
                name="message"
                rows="5"
                placeholder="请详细描述您的需求或问题，我们会尽快与您联系。"
                value={form.message}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit" className={styles.primaryBtn}>提交留言</button>
          </form>

          {/* 右侧：公司信息 + 快速支持提示条 */}
          <div className={styles.info}>
            <h3 className={styles.company}>星焓科技（北京）有限公司</h3>
            <p className={styles.en}>STARENTHALPY TECHNOLOGY (BEIJING) CO., LTD</p>

            <ul className={styles.list}>
              <li><strong>地址：</strong>北京市海淀区学院路35号世宁大厦14层</li>
              <li><strong>服务热线：</strong><a className={styles.tel} href="tel:18519685090">18519685090</a></li>
              <li><strong>邮编：</strong>100083</li>
              <li><strong>邮箱：</strong><a href="mailto:bd@starthermatech.com">bd@starthermatech.com</a></li>
            </ul>

            <div className={styles.quickHelp} role="note">
              如果您希望快速获得产品或技术支持，请直接拨打
              <a className={styles.telStrong} href="tel:18519685090">服务热线</a>
              与工作人员联系。
            </div>
          </div>
        </div>
      </div>

      {/* 👉 右下角悬浮直购链接 */}
      <a
        href="/order"
        className={styles.fabOrder}
        aria-label="如果您已经使用过我们的产品，可以输入产品编号直接订购"
      >
        <span className={styles.fabIcon} aria-hidden>🧾</span>
        <span className={styles.fabText}>已用过产品？输入编号直接订购</span>
      </a>
    </section>
  );
}
