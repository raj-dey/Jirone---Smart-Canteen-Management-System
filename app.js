import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInAnonymously,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    serverTimestamp,
    updateDoc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import {
    auth,
    db
} from "./firebase-config.js";

// Initialize EmailJS
(function(){
    emailjs.init("B9x38JNzZvzfiiP9w");
})();


const state = {
    user: null,
    cart: [],
    menu: [],
    orders: [],
    isLoginMode: true,
    tableNumber: null,
    selectedBlock: 'A',
    filterType: 'All',
    unsubMenu: null,
    unsubOrders: null ,
    searchQuery: ''
};

const App = {
    init: async () => {
        const urlParams = new URLSearchParams(window.location.search);
        if(urlParams.get('table')) state.tableNumber = urlParams.get('table');
        
        setTimeout(() => {
            if(!document.getElementById('loading-view').classList.contains('hidden') && !localStorage.getItem('jirone_user')) {
                App.showLogin();
            }
        }, 3000);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const savedUser = localStorage.getItem('jirone_user');
                if(savedUser) { state.user = JSON.parse(savedUser); App.loadApp(); }
                else { App.showLogin(); }
            }
            else {
                signInAnonymously(auth).catch(e => App.showLogin());
            }
        });
        
    },

    setFilter: (type) => {
        state.filterType = type;
        
        // Update Button Visuals (Highlight the clicked one)
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        if(type === 'All') document.getElementById('btn-all').classList.add('active');
        if(type === 'Veg') document.getElementById('btn-veg').classList.add('active');
        if(type === 'Non-Veg') document.getElementById('btn-nonveg').classList.add('active');
        
        App.renderMenu();
    },

    showLogin: () => {
        document.getElementById('loading-view').classList.add('hidden');
        document.getElementById('login-view').classList.remove('hidden');
        document.getElementById('main-app').classList.add('hidden');
    },

    // 1. Toggle between Login and Signup View
    toggleAuthMode: () => {
        state.isLoginMode = !state.isLoginMode;
        const title = document.getElementById('auth-title');
        const sub = document.getElementById('auth-sub');
        const btn = document.getElementById('auth-btn');
        const msg = document.getElementById('auth-toggle-msg');
        const link = document.querySelector('.toggle-link');
        const errorBox = document.getElementById('login-error');

        errorBox.classList.add('hidden'); // Clear errors

        if (state.isLoginMode) {
            title.innerText = "Welcome Back";
            sub.innerText = "Enter your details to access canteen";
            btn.innerText = "Login";
            msg.innerText = "Don't have an account?";
            link.innerText = "Sign Up";
        } else {
            title.innerText = "Create Account";
            sub.innerText = "Register to start ordering food";
            btn.innerText = "Sign Up";
            msg.innerText = "Already have an account?";
            link.innerText = "Login";
        }
    },

    // 2. Handle the Email/Password Auth
    handleEmailAuth: async () => {
        const email = document.getElementById('auth-email').value;
        const password = document.getElementById('auth-password').value;
        const errorBox = document.getElementById('login-error');

        if (!email || !password) {
            errorBox.innerText = "Please enter email and password";
            errorBox.classList.remove('hidden');
            return;
        }

        try {
            let result;
            if (state.isLoginMode) {
                // LOGIN LOGIC
                result = await signInWithEmailAndPassword(auth, email, password);
            } else {
                // SIGN UP LOGIC
                result = await createUserWithEmailAndPassword(auth, email, password);
            }

            // Set User State
            state.user = {
                email: result.user.email,
                // Simple logic: If email contains 'admin', set role to admin
                role: result.user.email === 'rajdey.btcs@adtu.in' ? 'admin' : 'student',
                name: result.user.email.split('@')[0]
            };
            
            localStorage.setItem('jirone_user', JSON.stringify(state.user));
            App.loadApp();

        } catch (error) {
            // Show clear error messages
            let msg = error.message;
            if(msg.includes('invalid-email')) msg = "Invalid Email Address";
            if(msg.includes('wrong-password')) msg = "Incorrect Password";
            if(msg.includes('user-not-found')) msg = "No account found. Please Sign Up.";
            if(msg.includes('email-already-in-use')) msg = "Email already used.";
            
            errorBox.innerText = msg;
            errorBox.classList.remove('hidden');
        }
    },

    handleGoogleLogin: async () => {
        const p = new GoogleAuthProvider();
        try { 
            const r = await signInWithPopup(auth, p); 
            state.user={email:r.user.email, role:r.user.email.includes('admin')?'admin':'student', name:r.user.displayName}; 
            localStorage.setItem('jirone_user', JSON.stringify(state.user)); 
            App.loadApp(); 
        } catch(e){ 
            document.getElementById('login-error').innerText="Google Auth Error: " + e.message; 
            document.getElementById('login-error').classList.remove('hidden'); 
        }
    },

    demoLogin: (role) => { 
        state.user={email:role==='admin'?'admin@adtu.in':'student@adtu.in', role, name:role==='admin'?'Admin User':'Student User'}; 
        localStorage.setItem('jirone_user', JSON.stringify(state.user)); 
        App.loadApp(); 
    },

    logout: async () => { 
        if(state.unsubMenu) state.unsubMenu(); 
        if(state.unsubOrders) state.unsubOrders(); 
        localStorage.removeItem('jirone_user'); 
        state.user = null; 
        state.cart = []; 
        try { await signOut(auth); } catch (e) {} 
        App.showLogin(); 
        App.toast("Logged Out Successfully"); 
    },

    loadApp: () => {
        document.getElementById('login-view').classList.add('hidden');
        document.getElementById('loading-view').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        
        App.listenMenu(); 
        App.listenOrders();
        
        if(state.user.role === 'admin') {
            document.getElementById('student-controls').classList.add('hidden');
            App.showView('admin-dashboard-view');
        } else {
            document.getElementById('student-controls').classList.remove('hidden');
            App.showView('student-home-view');
            App.renderBlockSelector();
        }
    },

    showView: (id) => {
        document.querySelectorAll('.sub-view').forEach(el => el.classList.add('hidden'));
        document.getElementById(id).classList.remove('hidden');
    },

    navigateToHome: () => state.user.role === 'admin' ? App.showView('admin-dashboard-view') : App.showView('student-home-view'),

    switchAdminTab: (tab) => {
        document.querySelectorAll('.admin-tabs button').forEach(b=>b.classList.remove('active'));
        if(tab==='orders') { 
            document.querySelector('.admin-tabs button:first-child').classList.add('active'); 
            document.getElementById('admin-orders-panel').classList.remove('hidden'); 
            document.getElementById('admin-stock-panel').classList.add('hidden'); 
        } else { 
            document.querySelector('.admin-tabs button:last-child').classList.add('active'); 
            document.getElementById('admin-orders-panel').classList.add('hidden'); 
            document.getElementById('admin-stock-panel').classList.remove('hidden'); 
        }
    },

    listenMenu: () => {
        if(state.unsubMenu) state.unsubMenu();
        state.unsubMenu = onSnapshot(collection(db, "menu"), (s) => {
            state.menu = s.docs.map(d=>({id:d.id, ...d.data()}));
            App.renderMenu();
            App.renderAdminMenu();
        });
    },

    listenOrders: () => {
        if(state.unsubOrders) state.unsubOrders();
        state.unsubOrders = onSnapshot(collection(db, "orders"), (s) => {
            const all = s.docs.map(d=>({id:d.id, ...d.data()}));
            if (state.user.role === 'student') {
                state.orders = all.filter(o => o.userEmail === state.user.email)
                                .sort((a,b) => (b.timestamp?.seconds||0) - (a.timestamp?.seconds||0));
                App.renderStudentOrders();
            } else {
                state.orders = all.sort((a,b) => (b.timestamp?.seconds||0) - (a.timestamp?.seconds||0));
                App.renderAdminOrders();
            }
        });
    },

    renderBlockSelector: () => {
        const blocks = ['A', 'B', 'J', 'K'];
        const container = document.getElementById('block-list');
        container.innerHTML = '';
        blocks.forEach(block => {
            const div = document.createElement('div');
            div.className = `block-card ${state.selectedBlock === block ? 'active' : ''}`;
            div.onclick = () => { state.selectedBlock = block; App.renderBlockSelector(); App.renderMenu(); };
            div.innerHTML = `<i class="fa-solid fa-building"></i><div class="block-name">${block} Block</div><div class="block-sub">Canteen</div>`;
            container.appendChild(div);
        });
    },

    renderMenu: () => {
        const grid = document.getElementById('menu-grid');
        grid.innerHTML = '';

        // --- FILTERING LOGIC STARTS HERE ---
        const filtered = state.menu.filter(i => {
            // --- UPDATED BLOCK CHECK ---
            let matchesBlock = false;
    
            // Check if data is an Array (New items) or String (Old items)
            if (Array.isArray(i.block)) {
                matchesBlock = i.block.includes(state.selectedBlock); 
            } else {
                // Fallback for old items that might still be just "A"
                matchesBlock = (i.block === state.selectedBlock || !i.block);
            }
            // ---------------------------
        
            const matchesType = state.filterType === 'All' || i.type === state.filterType;
            const search = state.searchQuery || ""; 
            const matchesSearch = i.name.toLowerCase().includes(search) || i.category.toLowerCase().includes(search);
        
            return matchesBlock && matchesType && matchesSearch;
        });
        // --- FILTERING LOGIC ENDS HERE ---

        if(filtered.length === 0) {
            document.getElementById('empty-menu-msg').classList.remove('hidden');
        } else {
            document.getElementById('empty-menu-msg').classList.add('hidden');
        }

        filtered.forEach(item => {
            const isSoldOut = !item.isAvailable;
            const buttonHtml = isSoldOut 
                ? `<button class="z-add-btn btn-disabled" disabled>SOLD OUT</button>`
                : `<button class="z-add-btn" onclick="window.app.addToCart('${item.id}')">ADD</button>`;
            
            const cardClass = isSoldOut ? 'z-card sold-out' : 'z-card';
            const overlayHtml = isSoldOut ? '<div class="sold-overlay">SOLD OUT</div>' : '';

            grid.innerHTML += `
            <div class="${cardClass}">
                <div class="z-img-box">
                    ${overlayHtml}
                    <img src="${item.image}" class="z-img" onerror="this.src='https://placehold.co/400x300?text=Food'">
                    <div class="z-tag">30 min</div>
                </div>
                <div class="z-content">
                    <div class="z-row">
                        <div class="z-title">
                            ${item.name}
                            <i class="fa-solid fa-circle" style="font-size:0.6rem; color:${item.type === 'Non-Veg' ? 'red' : 'green'};"></i>
                        </div>
                        <div class="z-rating">4.2 <i class="fa-solid fa-star" style="font-size:0.6rem;"></i></div>
                    </div>
                    <div class="z-desc">${item.category} • ${item.type || ''}</div>
                    <div class="z-footer">
                        <div class="z-price">₹${item.price}</div>
                        ${buttonHtml}
                    </div>
                </div>
            </div>`;
        });
    },

    handleSearch: (query) => {
        // 1. Update the state immediately with what user typed
        state.searchQuery = query.toLowerCase().trim();
        
        // 2. Re-draw the menu instantly
        App.renderMenu();
    },

    addToCart: (id) => { 
        const item = state.menu.find(x=>x.id===id); 
        if(item) { state.cart.push(item); App.renderCart(); App.toast(`Added ${item.name}`); } 
    },

    renderCart: () => {
        document.getElementById('cart-count').innerText = state.cart.length;
        document.getElementById('cart-count').classList.remove('hidden');
        const list = document.getElementById('cart-items-container');
        if(state.cart.length === 0) {
            list.innerHTML = '<p style="text-align:center; color:#999;">Cart is empty</p>';
        } else {
            list.innerHTML = state.cart.map(i=>`
                <div class="cart-item">
                    <span>${i.name}</span>
                    <b>₹${i.price}</b>
                </div>`).join('');
        }
        const total = state.cart.reduce((a,b)=>a+b.price,0);
        document.getElementById('cart-total').innerText = '₹' + total;
        const warn = document.getElementById('table-warning');
        if(!state.tableNumber) warn.classList.remove('hidden');
        else warn.classList.add('hidden');
    },

    renderStudentOrders: () => {
        document.getElementById('orders-list').innerHTML = state.orders.map(o=>`<div class="order-card ${o.status==='Ready'?'ready':''}"><b>Table ${o.tableNumber}</b> <span class="order-id">${o.customOrderId}</span><br><span>${o.items.join(', ')}</span><div style="font-weight:700; margin-top:5px;">₹${o.totalAmount} <span style="float:right; color:${o.status==='Ready'?'var(--success)':'var(--warning)'}">${o.status}</span></div>${o.status==='Ready'?'<div class="ready-msg">Ready! Collect from counter.</div>':''}</div>`).join('');
    },

    renderAdminOrders: () => {
        document.getElementById('admin-orders-list').innerHTML = state.orders.map(o => `
        <div class="admin-item">
            <div>
                <b>Table ${o.tableNumber}</b> 
                <span style="font-size:0.8rem; color:#888;">${o.customOrderId}</span>
                <br>
                <div style="font-weight:600; font-size:0.9rem; color:#333;">${o.userName || 'Unknown'}</div>
                <small>${o.items.join(', ')}</small>
            </div>
            
            <div style="display:flex; flex-direction:column; gap:5px; align-items:flex-end;">
                ${o.status === 'Pending' 
                    ? `<button onclick="window.app.markReady('${o.id}')" class="btn" style="background:var(--success); color:white; padding:5px 10px; border-radius:4px;">Mark Ready</button>` 
                    : `<span style="color:green; font-weight:bold;">✓ Served</span>`
                }
                
                ${o.userPhone 
                    ? `<a href="https://wa.me/91${o.userPhone}?text=Hello ${o.userName}, your order is READY at Jirone Canteen!" target="_blank" style="font-size:0.75rem; color:#25D366; text-decoration:none; font-weight:600; margin-top:5px;">
                        <i class="fa-brands fa-whatsapp"></i> WhatsApp
                        </a>`
                    : ''
                }
            </div>
        </div>`).join('') || '<p style="text-align:center; padding:20px; color:#888;">No orders yet.</p>';
    },

    renderAdminMenu: () => {
        document.getElementById('admin-menu-list').innerHTML = state.menu.map(i=>`
            <div class="admin-item">
                <div style="display:flex; gap:10px; align-items:center;">
                    <img src="${i.image}" style="width:40px; height:40px; border-radius:4px; object-fit:cover;">
                    <div><b>${i.name}</b><br>
                            <small>
                                ${Array.isArray(i.block) ? i.block.join(', ') : (i.block || 'All')} Block - ₹${i.price}
                            </small>
                    </div>
                </div>
                <button onclick="window.app.toggleStock('${i.id}', ${i.isAvailable})" class="btn" style="font-size:0.7rem; padding:5px; background:${i.isAvailable?'#dcfce7':'#fee2e2'}; color:${i.isAvailable?'#166534':'#991b1b'}; border-radius:4px;">
                    ${i.isAvailable?'STOCK':'OUT'}
                </button>
            </div>
        `).join('');
    },

    startScanner: () => {
        document.getElementById('reader').style.display='block';
        const s = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
        s.render((t)=>{ 
            if(t.includes('table=')) state.tableNumber = new URL(t).searchParams.get('table'); 
            else state.tableNumber = t; 
            s.clear(); 
            document.getElementById('reader').style.display='none'; 
            App.renderCart(); 
            App.toast(`Table ${state.tableNumber} Set`);
        }, (e)=>{});
    },

    setManualTable: () => { 
        const val = document.getElementById('manual-table-select').value;
        if(val) { state.tableNumber = val; App.renderCart(); App.toast(`Table ${val} Selected`); }
    },

    placeOrder: async () => {
        // 1. Validation
        if(state.cart.length === 0) return App.toast("Cart is empty", "error");
        
        if(!state.tableNumber) { 
            const w = document.getElementById('table-warning');
            w.classList.remove('hidden'); // Ensure it's visible
            w.style.animation = "shake 0.4s"; 
            setTimeout(() => w.style.animation = "", 400); 
            return App.toast("Scan Table QR First", "error"); 
        }
        
        const phone = document.getElementById('customer-phone').value.trim();
        if(!phone || phone.length !== 10 || isNaN(phone)) {
            document.getElementById('customer-phone').focus();
            return App.toast("Enter valid 10-digit Phone", "error");
        }

        const total = state.cart.reduce((a,b)=>a+b.price,0);
        const oid = `OD${Date.now()}${Math.floor(Math.random()*1000)}`;

        // 2. Show Animation Immediately
        App.showSuccessAnim();

        try {
            // 3. Save to Database
            await addDoc(collection(db, "orders"), {
                customOrderId: oid,
                userId: state.user.email,
                userName: state.user.name || state.user.email.split('@')[0],
                userEmail: state.user.email,
                userPhone: phone,
                tableNumber: state.tableNumber,
                items: state.cart.map(i => i.name),
                totalAmount: total,
                status: "Pending",
                timestamp: serverTimestamp()
            });

            // NEW: Trigger Email & PDF Generation
            App.sendInvoice({
                customOrderId: oid,
                userName: state.user.name || "Student",
                userEmail: state.user.email, // Sends to registered/login email
                tableNumber: state.tableNumber,
                totalAmount: total,
                itemsRaw: state.cart // Passing full cart objects
            });

            // 4. EMPTY THE CART
            state.cart = [];
            App.renderCart(); // This updates the UI to show "Cart is empty" text
            document.getElementById('customer-phone').value = ""; // Clear phone input

        } catch (error) {
            console.error(error);
            App.toast("Order Failed: " + error.message, "error");
            // If error, hide animation so they can try again
            document.getElementById('success-anim').classList.add('hidden');
        }
    },

    //sent PDF invoice via emailjs
    sendInvoice: (orderData) => {

        const emailParams = {
            to_name: orderData.userName,
            to_email: orderData.userEmail,
            order_id: orderData.customOrderId,
            total_amount: orderData.totalAmount,
            order_date: new Date().toLocaleString(),
            table_no: orderData.tableNumber,
        };

        // --- 3. SEND EMAIL ---
        const serviceID = "service_a07iigt";
        const templateID = "template_yjehacq";

        emailjs.send(serviceID, templateID, emailParams)
            .then(() => {
                console.log("Email sent successfully");
                App.toast("Invoice sent to Email");
            })
            .catch((err) => console.error("Email failed", err));

        //  DOWNLOAD PDF ---
        //doc.save(`Invoice_${orderData.customOrderId}.pdf`);
    },

    showSuccessAnim: () => {
        const anim = document.getElementById('success-anim');
        anim.classList.remove('hidden');
        
        // After 2.5 seconds, hide animation and go to Orders Page
        setTimeout(() => {
            anim.classList.add('hidden');
            App.showView('orders-view');
        }, 2500);
    },

    addMenuItem: async () => {
        const name = document.getElementById('new-item-name').value;
        const price = Number(document.getElementById('new-item-price').value);
        const cat = document.getElementById('new-item-category').value;
        const type = document.getElementById('new-item-type').value; 
        
        // --- NEW LOGIC START ---
        // 1. Get all checked boxes
        const checkboxes = document.querySelectorAll('.block-check:checked');
        // 2. Convert them into a list: ['A', 'B']
        const blocks = Array.from(checkboxes).map(cb => cb.value);

        // 3. Validation: Make sure at least one is checked
        if(blocks.length === 0) return App.toast("Select at least one Block", "error");
        // --- NEW LOGIC END ---

        if(!name || !price) return App.toast("Missing Fields", "error");

        const file = document.getElementById('new-item-image').files[0];
        let image = "https://placehold.co/200x150?text=Food"; 

        if(file) {
            if (file.size > 10 * 1024 * 1024) return App.toast("Image > 10MB", "error");
            try {
                image = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const img = new Image();
                        img.onload = () => {
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');
                            const scale = 500 / img.width;
                            canvas.width = 500;
                            canvas.height = img.height * scale;
                            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                            resolve(canvas.toDataURL('image/jpeg', 0.7));
                        };
                        img.src = e.target.result;
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            } catch(e) { return App.toast("Image Error", "error"); }
        }

        // 4. Save to Database (Notice we save 'blocks' not 'block')
        await addDoc(collection(db, "menu"), { 
            name, 
            price, 
            category: cat, 
            block: blocks, // <--- SAVING THE LIST HERE
            type, 
            image, 
            isAvailable: true 
        });
        
        App.toast("Item Added Successfully");
        
        // Clear inputs
        document.getElementById('new-item-name').value = "";
        document.getElementById('new-item-price').value = "";
        document.getElementById('new-item-image').value = "";
        // Uncheck all boxes
        checkboxes.forEach(cb => cb.checked = false);
    },

    markReady: async (id, phone) => { 
        await updateDoc(doc(db, "orders", id), { status: "Ready" }); 
        App.toast("Marked Ready & SMS Sent"); 
    },

    toggleStock: async (id, s) => { await updateDoc(doc(db, "menu", id), { isAvailable: !s }); },

    toast: (msg, type="info") => { 
        const el = document.getElementById('toast'); 
        el.innerText = msg; 
        el.style.background = type==='error' ? '#ef4444' : '#333'; 
        el.classList.remove('hidden'); 
        setTimeout(()=>el.classList.add('hidden'), 3000); 
    }
};


window.app = App;
App.init();