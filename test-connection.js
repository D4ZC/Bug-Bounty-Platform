// Script para probar la conexión al backend
const fetch = require('node-fetch');

async function testConnection() {
  console.log('🔍 Probando conexión al backend...\n');
  
  try {
    // Probar endpoint de salud
    console.log('1. Probando endpoint de salud...');
    const healthResponse = await fetch('http://localhost:3001/api/health');
    console.log(`   Status: ${healthResponse.status}`);
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('   ✅ Backend respondiendo correctamente');
      console.log(`   Timestamp: ${healthData.timestamp}`);
    } else {
      console.log('   ❌ Backend no responde correctamente');
    }
    
    console.log('\n2. Probando endpoint de información de API...');
    const apiResponse = await fetch('http://localhost:3001/api');
    console.log(`   Status: ${apiResponse.status}`);
    
    if (apiResponse.ok) {
      const apiData = await apiResponse.json();
      console.log('   ✅ API disponible');
      console.log(`   Nombre: ${apiData.name}`);
      console.log(`   Versión: ${apiData.version}`);
    } else {
      console.log('   ❌ API no disponible');
    }
    
    console.log('\n3. Probando endpoint de login (sin datos)...');
    const loginResponse = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    });
    console.log(`   Status: ${loginResponse.status}`);
    
    if (loginResponse.status === 400) {
      console.log('   ✅ Endpoint de login disponible (esperado error 400 por datos vacíos)');
    } else {
      console.log('   ⚠️ Endpoint de login responde de manera inesperada');
    }
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.log('\n🔧 Posibles soluciones:');
    console.log('1. Verificar que el backend esté corriendo en puerto 3001');
    console.log('2. Verificar que MongoDB esté corriendo');
    console.log('3. Verificar que las variables de entorno estén configuradas');
  }
}

testConnection(); 