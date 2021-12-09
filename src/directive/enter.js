const handlerEnter = function (event) {
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
    const form = el.querySelector('.avue-form');
    const allTooltip = form.querySelectorAll('.el-tooltip');
    // 需要定时才可以更新 tabIndex
    setTimeout(() => {
      Array.from(allTooltip).forEach(el => {
        el.setAttribute('tabIndex', -1);
      })
    }, 500)

    form.addEventListener('keyup', handlerEnter);
  },
  unbind(el) {
    const form = el.querySelector('.avue-form');
    form.removeEventListener('keyup', handlerEnter);
  },
};
