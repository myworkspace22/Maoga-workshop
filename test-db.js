const knex = require('knex')(require('./knexfile').development);

knex.raw('SELECT NOW()')
  .then(res => {
    console.log('✅ Connected to Supabase!', res.rows[0]);
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  });
