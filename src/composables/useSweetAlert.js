import Swal from 'sweetalert2';
import { getCurrentInstance } from 'vue';

export function useSweetAlert() {
    const instance = getCurrentInstance();
    return instance.appContext.config.globalProperties.$swal || Swal;
}