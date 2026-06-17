<script setup>
import Text from "@/components/Text.vue";
</script>

<template>
    <button class="opinion-btn" @click="openModal">
        意見<br />
        回饋
    </button>

    <div v-if="isOpen" class="modal-mask" @click.self="closeModal">
        <div class="modal">
            <button class="close-btn" @click="closeModal">×</button>

            <p>意見回饋</p>

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

<script setup>
import { reactive, ref } from "vue";

const isOpen = ref(false);

const form = reactive({
    name: "",
    email: "",
    message: "",
});

function openModal() {
    isOpen.value = true;
}

function closeModal() {
    isOpen.value = false;
}

function submitForm() {
    console.log("送出的資料：", form);

    alert("感謝您的回饋！");

    form.name = "";
    form.email = "";
    form.message = "";

    closeModal();
}
</script>

<style scoped>
.opinion-btn {
    position: fixed;
    right: 32px;
    bottom: 32px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #3c3c3c;
    color: #f0e9e3;
    border: 4px solid #f0e9e3;
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
    font-size: 1.1.25rem;
}

input,
textarea {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
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
</style>