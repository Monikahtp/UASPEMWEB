<template>
  <div>
    <h2>Form Registrasi Lomba</h2>
    <form @submit.prevent="registerUser">
      <label for="name">Nama:</label>
      <input type="text" v-model="name" required>

      <label for="email">Email:</label>
      <input type="email" v-model="email" required>

      <label for="asal_sekolah">Asal Sekolah:</label>
      <input type="text" v-model="asal_sekolah" required>

      <button type="submit">Daftar</button>
    </form>

    <div v-if="registrationSuccess">
      <p>Terima kasih telah mendaftar!</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const name = ref('');
const email = ref('');
const asal_sekolah = ref('');
const registrationSuccess = ref(false);

const registerUser = async () => {
  try {
    const res = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        asal_sekolah: asal_sekolah.value,
        status: "waiting",
        tanggal_pendaftaran: new Date().toISOString().split('T')[0],
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      console.log(`email ${email.value} registration failed`);
    } else {
      console.log(`email ${email.value} has successfully registered`);
      registrationSuccess.value = true;
      // Redirect ke halaman cek status dengan menyertakan email
      router.push({ path: `/cek-status/${email.value}` });
    }
  } catch (error) {
    console.error('Error during registration:', error);
  }
};
</script>
