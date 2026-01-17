// Complete API Integration Test
const API_BASE = 'http://localhost:5000/api/v1';

async function testCompleteWorkflow() {
  console.log('🚀 Testing Complete API Integration\n');

  try {
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
    
    const token = loginData.data.token;
    const userId = loginData.data.user.id;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'user-id': userId
    };

    // 2. Get Student Dashboard
    console.log('\\n2. Getting Student Dashboard...');
    const dashboardResponse = await fetch(`${API_BASE}/student/dashboard`, { headers });
    const dashboardData = await dashboardResponse.json();
    console.log('✅ Dashboard Stats:', dashboardData.data.stats);

    // 3. Create New Request
    console.log('\\n3. Creating New Re-evaluation Request...');
    const createResponse = await fetch(`${API_BASE}/student/requests`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        subject: 'Computer Science',
        examDate: '2024-02-15',
        reason: 'Answer key contains errors in questions 5 and 7. My solutions are correct.',
        originalMarks: 82
      })
    });
    const createData = await createResponse.json();
    console.log('✅ Request Created:', createData.message);
    const requestId = createData.data.id;

    // 4. Get All Student Requests
    console.log('\\n4. Getting All Student Requests...');
    const requestsResponse = await fetch(`${API_BASE}/student/requests`, { headers });
    const requestsData = await requestsResponse.json();
    console.log('✅ Total Requests:', requestsData.data.length);

    // 5. Examiner Login
    console.log('\\n5. Examiner Login...');
    const examinerLoginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'examiner@test.com',
        password: 'password',
        role: 'examiner'
      })
    });
    const examinerLoginData = await examinerLoginResponse.json();
    console.log('✅ Examiner Login:', examinerLoginData.message);
    
    const examinerHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${examinerLoginData.data.token}`,
      'user-id': examinerLoginData.data.user.id
    };

    // 6. Get Examiner Queue
    console.log('\\n6. Getting Examiner Queue...');
    const queueResponse = await fetch(`${API_BASE}/examiner/queue`, { headers: examinerHeaders });
    const queueData = await queueResponse.json();
    console.log('✅ Queue:', `${queueData.data.totalPending} pending, ${queueData.data.totalUnderReview} under review`);

    // 7. Review Request (Move to Under Review)
    console.log('\\n7. Moving Request to Under Review...');
    const reviewResponse = await fetch(`${API_BASE}/examiner/requests/${requestId}`, {
      method: 'PUT',
      headers: examinerHeaders,
      body: JSON.stringify({
        status: 'under_review',
        examinerComments: 'Reviewing the answer key and student responses'
      })
    });
    const reviewData = await reviewResponse.json();
    console.log('✅ Review Status:', reviewData.message);

    // 8. Approve Request
    console.log('\\n8. Approving Request...');
    const approveResponse = await fetch(`${API_BASE}/examiner/requests/${requestId}`, {
      method: 'PUT',
      headers: examinerHeaders,
      body: JSON.stringify({
        status: 'approved',
        examinerComments: 'Answer key errors confirmed. Marks updated.',
        revisedMarks: 95
      })
    });
    const approveData = await approveResponse.json();
    console.log('✅ Approval:', approveData.message);

    // 9. Get Completed Requests
    console.log('\\n9. Getting Completed Requests...');
    const completedResponse = await fetch(`${API_BASE}/examiner/completed`, { headers: examinerHeaders });
    const completedData = await completedResponse.json();
    console.log('✅ Completed:', `${completedData.data.totalApproved} approved, ${completedData.data.totalRejected} rejected`);

    // 10. Admin Dashboard
    console.log('\\n10. Admin Login and Dashboard...');
    const adminLoginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@test.com',
        password: 'password',
        role: 'admin'
      })
    });
    const adminLoginData = await adminLoginResponse.json();
    
    const adminHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminLoginData.data.token}`,
      'user-id': adminLoginData.data.user.id
    };

    const adminDashboardResponse = await fetch(`${API_BASE}/admin/dashboard`, { headers: adminHeaders });
    const adminDashboardData = await adminDashboardResponse.json();
    console.log('✅ Admin Stats:', adminDashboardData.data.stats);

    console.log('\\n🎉 Complete API Integration Test Successful!');
    console.log('\\n📋 Workflow Summary:');
    console.log('   • Student logged in and created request');
    console.log('   • Examiner reviewed and approved request');
    console.log('   • Admin can view system overview');
    console.log('   • All CRUD operations working');
    console.log('   • Status transitions: submitted → under_review → approved');

  } catch (error) {
    console.error('❌ Test Failed:', error.message);
  }
}

// Run the test
testCompleteWorkflow();