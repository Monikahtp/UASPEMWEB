<template>
    <div>
      <h2>Cek Status Pendaftaran</h2>
      <form @submit.prevent="checkStatus">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required>
  
        <button type="submit">Cek Status</button>
      </form>
  
      <div v-if="statusResult">
        <h3>Status Pendaftaran:</h3>
        <p>{{ statusResult }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const email = ref('');
  const statusResult = ref(null);
  
  const checkStatus = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/register?email=${email.value}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const json = await res.json();
  
      if (!res.ok) {
        console.log(`Error while checking status for email ${email.value}`);
      } else {
        statusResult.value = json.status;
      }
    } catch (error) {
      console.error('Error during status check:', error);
    }
  };
  </script>
  