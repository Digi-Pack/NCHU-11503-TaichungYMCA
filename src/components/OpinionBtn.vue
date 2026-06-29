<script setup>
import { reactive, ref, onMounted, onUnmounted } from "vue";
import Swal from "sweetalert2";

const isOpen = ref(false);
const isVisible = ref(true);

const form = reactive({
    name: "王小明",
    email: "test@example.com",
    message: "網站設計很棒，資訊清楚易懂！",
});

let observer = null;

onMounted(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    observer = new IntersectionObserver(
        ([entry]) => { isVisible.value = !entry.isIntersecting },
        { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(footer);
});

onUnmounted(() => {
    observer?.disconnect();
});

function openModal() {
    isOpen.value = true;
}

function closeModal() {
    isOpen.value = false;
}

function submitForm() {
    console.log("送出的資料：", form);

    form.name = "";
    form.email = "";
    form.message = "";

    closeModal();

    Swal.fire({
        title: "感謝您的回饋！",
        icon: "success",
        confirmButtonText: "確定",
        confirmButtonColor: "#1e4620",
    });
}
</script>

<template>
    <Transition name="fade">
        <button v-if="isVisible" class="opinion-btn" @click="openModal">
            意見<br />
            回饋
        </button>
    </Transition>

    <div v-if="isOpen" class="modal-mask" @click.self="closeModal">
        <div class="modal">
            <button class="close-btn" @click="closeModal">×</button>

            <p class="form-title">意見回饋</p>

            <form @submit.prevent="submitForm">
                <label>
                    姓名
                    <input v-model="form.name" type="text" placeholder="請輸入姓名" />
                </label>

                <label>
                    Email
                    <input v-model="form.email" type="email" placeholder="請輸入 Email" />
                </label>

                <label>
                    回饋內容
                    <textarea v-model="form.message" placeholder="請輸入您的意見"></textarea>
                </label>

                <button class="submit-btn" type="submit">送出</button>
            </form>
        </div>
    </div>
</template>


<style scoped>
.opinion-btn {
    position: fixed;
    right: 40px;
    bottom: 40px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #D96B27;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    color: #f0e9e3;
    border: 2px solid #F9F6F0;
    font-size: 1.25rem;
    font-weight: 700;
    cursor: pointer;
    z-index: 1000;
}

.modal-mask {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    position: relative;
    width: 420px;
    max-width: calc(100% - 32px);
    background: #fff;
    border-radius: 20px;
    padding: 32px;
}

.close-btn {
    position: absolute;
    top: 16px;
    right: 20px;
    border: none;
    background: none;
    font-size: 32px;
    cursor: pointer;
}

.modal p {
    margin-bottom: 1.5rem;
    color: #1e4620;
    text-align: center;
    font-weight: bold;
    font-size: 2rem;
}

form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: #3c3c3c;
    font-size: 1.5rem;
}

input,
textarea {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

textarea {
    min-height: 120px;
    resize: vertical;
}

.submit-btn {
    margin-top: 8px;
    height: 44px;
    border: none;
    border-radius: 999px;
    background: #1e4620;
    color: white;
    font-size: 16px;
    cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@media (max-width: 1024px) {
    .opinion-btn {
        right: 30px;
    }
}

@media (max-width: 768px) {
    .opinion-btn {
        right: 20px;
    }
}
</style>