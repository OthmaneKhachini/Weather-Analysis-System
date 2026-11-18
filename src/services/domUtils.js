export function showNotification(message, type = 'info') {
  let toast = document.getElementById('custom-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'custom-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.padding = '1rem';
    toast.style.borderRadius = '8px';
    toast.style.color = 'white';
    toast.style.zIndex = '9999';
    document.body.appendChild(toast);
  }
  
  toast.innerHTML = message;
  toast.style.backgroundColor = type === 'error' ? '#ef4444' : '#10b981';
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}

export function attachVanillaEvents() {
  const refreshBtn = document.querySelector('#vanilla-refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      console.log('原生 JS 事件触发：刷新数据...');
      showNotification('通过原生 JS 事件监听器刷新数据！', 'info');
    });
  }
}