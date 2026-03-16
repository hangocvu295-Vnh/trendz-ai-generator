// script.js
async function generateScript() {
    const productName = document.getElementById('productName').value;
    const style = document.getElementById('styleSelect').value;
    const resultDiv = document.getElementById('output');
    
    // API Key của Groq
    const GROQ_API_KEY = "YOUR_API_KEY_HERE"; // Để như này thôi
    const API_URL = "https://api.groq.com/openai/v1/chat/completions";

    if (!productName) {
        alert("Nhập tên sản phẩm đi bạn ơi!");
        return;
    }

    // Hiệu ứng loading chuyên nghiệp
    resultDiv.innerHTML = `<div class="loader">Đang "cook" kịch bản viral cho bạn...</div>`;

    const promptText = `Bạn là một chuyên gia sáng tạo nội dung TikTok triệu view. 
    Hãy viết 1 kịch bản video ngắn (dưới 60 giây) cho sản phẩm: ${productName}. 
    Phong cách: ${style}. 
    Yêu cầu:
    1. Hook cực mạnh (3 giây đầu).
    2. Nội dung chính hấp dẫn, trực quan.
    3. CTA (Kêu gọi hành động) cuối video.
    4. Gợi ý góc quay (Visual B-roll).`;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                model: "llama3-8b-8192", // Model cực nhanh của Groq
                messages: [{ role: "user", content: promptText }]
            })
        });

        const data = await response.json();
        
        // Kiểm tra lỗi từ API
        if (data.error) {
            throw new Error(data.error.message);
        }

        const scriptContent = data.choices[0].message.content;
        
        // Hiển thị kết quả
        resultDiv.innerHTML = `<div class="script-result"><h3>Kịch bản của bạn:</h3><pre>${scriptContent}</pre></div>`;
        
    } catch (error) {
        console.error("Lỗi:", error);
        resultDiv.innerHTML = `<p style="color: #ff4d4d;">Oops! ${error.message}. Kiểm tra lại mạng hoặc API Key nhé!</p>`;
    }
}