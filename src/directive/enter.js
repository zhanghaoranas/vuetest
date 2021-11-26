const handlerEnter = function(event) {
  // 应该在绑定的时候进行 数据的收集， 在此处可能会存在性能问题。
  const notCanEnterElements = this.querySelectorAll('[date-cant-enter="true"] input');
  const list = Array.from(notCanEnterElements);
  if (list.includes(event.target)) {
    return;
  }
  if (event.key === 'Enter' && event.target.nodeName !== 'BUTTON') {
    this.querySelector('.avue-form__menu .el-form-item__content .el-button--primary').click();
  }
};

export default {
  bind(el) {
    const className = el.className.split(' ');
    if (!className.includes('avue-crud')) {
      throw new Error('该指令只适用于avue-crud组件');
    }

    el.addEventListener('keyup', handlerEnter);
  },
  unbind(el) {
    el.removeEventListener('keyup', handlerEnter);
  },
};
