// src/components/Contact.jsx
import React from 'react';

export default function Contact() {
  return (
    <div className="container">
      <h2>联系我们 <span className="subtitle">CONTACT US</span></h2>
      <div className="contact-content">
        <form className="contact-form">
          <input type="text" placeholder="您的姓名" />
          <input type="text" placeholder="您的电话" />
          <input type="email" placeholder="您的邮箱" />
          <textarea placeholder="留言内容" rows="5"></textarea>
          <button type="submit" className="btn-primary">提交留言</button>
        </form>
        <div className="contact-info">
          <h3>星焓科技（北京）有限公司</h3>
          <p>STARENTHALPY TECHNOLOGY (BEIJING) CO., LTD</p>
          <br/>
          <p><strong>地址：</strong>北京市海淀区学院路35号世宁大厦14层</p>
          <p><strong>服务热线：</strong>18519685090</p>
          <p><strong>邮编：</strong>100083</p>
          <p><strong>邮箱：</strong>bd@starthermatech.com</p>
        </div>
      </div>
    </div>
  );
}