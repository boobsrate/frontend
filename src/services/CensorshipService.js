/**
 * Сервис для проверки цензуры контента
 */
export default {
  /**
   * Проверяет, нужно ли применять цензуру
   * @returns {boolean} true, если нужно применять цензуру
   */
  isCensorshipEnabled() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('murr_censorship') === 'true';
  },

  /**
   * Возвращает URL изображения в зависимости от настроек цензуры
   * @param {string} originalUrl - оригинальный URL изображения
   * @param {boolean} isFullImage - флаг, указывающий, является ли изображение полноразмерным
   * @returns {string} URL изображения с учетом цензуры
   */
  // eslint-disable-next-line no-unused-vars
  getImageUrl(originalUrl, isFullImage = false) {
    if (this.isCensorshipEnabled()) {
      // Для полноразмерных и превью используем одно и то же изображение цензуры
      return require('@/assets/censored-improved.svg');
    }
    return originalUrl;
  }
};
