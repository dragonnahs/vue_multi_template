import FastClick from 'fastclick'

export default function init() {
  if ('addEventListener' in document) {
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        FastClick.attach(document.body)
      },
      false
    )
  }
}
