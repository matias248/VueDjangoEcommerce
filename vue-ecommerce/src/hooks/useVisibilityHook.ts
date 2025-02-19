// useVisibility.js
import { ref, onMounted, onUnmounted } from 'vue';

const isVisibleInViewport = (element:any) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export function useVisibility() {
  const target = ref(null);
  const isVisible = ref(true);

  const checkVisibility = () => {
    if (target.value) {
      isVisible.value = isVisibleInViewport(target.value);
    }
  };

  onMounted(() => {
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', checkVisibility);
    window.removeEventListener('resize', checkVisibility);
  });

  return { target, isVisible };
}
