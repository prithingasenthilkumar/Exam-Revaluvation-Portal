// Test the workflow: Submit → Review → Approve
const API_BASE = 'http://localhost:5000/api/v1';

async function testWorkflow() {
  console.log('🚀 Testing Exam Re-evaluation Workflow\n');

  // 1. Student Login
  console.log('1. Student Login...');
  const loginResponse = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'student@test.com',
      password: 'password',
      role: 'student'
    })
  });
  const loginData = await loginResponse.json();
  console.log('✅ Login:', loginData.message);

  // 2. Submit Request
  console.log('\n2. Submitting Re-evaluation Request...');
  const submitResponse = await fetch(`${API_BASE}/student/requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subject: 'Physics',
      examDate: '2024-01-20',
      reason: 'Answer key error in question 3'
    })
  });
  const submitData = await submitResponse.json();
  console.log('✅ Submit:', submitData.message);
  const requestId = submitData.data.id;

  // 3. Examiner Views Queue
  console.log('\n3. Examiner checking queue...');
  const queueResponse = await fetch(`${API_BASE}/examiner/queue`);
  const queueData = await queueResponse.json();
  console.log('✅ Queue:', `${queueData.data.pending.length} pending requests`);

  // 4. Examiner Reviews Request
  console.log('\n4. Examiner reviewing request...');
  const reviewResponse = await fetch(`${API_BASE}/examiner/requests/${requestId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'under_review',
      comments: 'Reviewing the answer key'
    })
  });
  const reviewData = await reviewResponse.json();
  console.log('✅ Review:', reviewData.message);

  // 5. Examiner Approves Request
  console.log('\n5. Examiner approving request...');
  const approveResponse = await fetch(`${API_BASE}/examiner/requests/${requestId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'approved',
      comments: 'Marks updated - error confirmed'
    })
  });
  const approveData = await approveResponse.json();
  console.log('✅ Approve:', approveData.message);

  // 6. Admin Dashboard
  console.log('\n6. Admin checking dashboard...');
  const adminResponse = await fetch(`${API_BASE}/admin/dashboard`);
  const adminData = await adminResponse.json();
  console.log('✅ Admin Stats:', adminData.data.stats);

  console.log('\n🎉 Workflow Complete: Submit → Review → Approve');
}

// Run if server is running
testWorkflow().catch(err => console.error('❌ Error:', err.message));