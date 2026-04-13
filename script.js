/* ── ロード制御（最優先で実行） ── */
        let isLoaded = false;
        function completeLoading() {
            if (isLoaded) return;
            isLoaded = true;
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.add('loaded');
                setTimeout(() => { loader.style.display = 'none'; }, 1500);
            }
            
            const obs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
                });
            }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
            document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
        }

        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(completeLoading, 1500);
        });
        
        window.addEventListener('load', () => {
            setTimeout(completeLoading, 1500);
        });

        setTimeout(completeLoading, 4000);

        /* ── ヒエログリフリング生成 ── */
        const glyphRing = document.getElementById('glyphRing');
        if (glyphRing) {
            const glyphs = ['𓂀','𓆩','𓇬','𓋴','𓈖','𓄿','𓅱','𓇯','𓂋','𓏤','𓆑','𓁶','𓅓','𓎡','𓈗'];
            glyphs.forEach((g, i) => {
                const span = document.createElement('span');
                span.textContent = g;
                const angle = (360 / glyphs.length) * i;
                span.style.transform = `rotate(${angle}deg)`;
                span.style.animationDelay = `${(i / glyphs.length) * 3}s`;
                glyphRing.appendChild(span);
            });
        }

        /* ── カスタムカーソル ── */
        const cursorWrap = document.getElementById('cursor-wrap');
        let hasMoved = false;
        document.addEventListener('mousemove', (e) => {
            if (!cursorWrap) return;
            cursorWrap.style.left = e.clientX + 'px';
            cursorWrap.style.top  = e.clientY + 'px';
            if (!hasMoved) { cursorWrap.classList.add('visible'); hasMoved = true; }
        });
        document.addEventListener('mousedown', (e) => {
            if (cursorWrap) cursorWrap.classList.add('clicking');
            const ripple = document.createElement('div');
            ripple.className = 'cursor-ripple';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top  = e.clientY + 'px';
            document.body.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);
        });
        document.addEventListener('mouseup', () => { if(cursorWrap) setTimeout(() => cursorWrap.classList.remove('clicking'), 350); });
        
        document.querySelectorAll('a, button, .stream-tag, .tab-btn, .wish-item, .indicator-wrap, .modal-close, .fantia-link-btn, .cien-banner-inner, .ch-link, .campfire-banner-inner, .booth-banner-inner').forEach(el => {
            el.addEventListener('mouseenter', () => { if(cursorWrap) cursorWrap.classList.add('hover'); });
            el.addEventListener('mouseleave', () => { if(cursorWrap) cursorWrap.classList.remove('hover'); });
        });

        /* ── ナビゲーション ── */
        const floatingNav = document.querySelector('.floating-nav');
        const navList     = document.getElementById('nav-list');
        const navLinks    = document.querySelectorAll('.floating-nav a');
        const slider      = document.getElementById('nav-slider');

        function updateSlider(target) {
            if (!target || !slider || !navList) return;
            const nr = navList.getBoundingClientRect();
            const tr = target.getBoundingClientRect();
            slider.style.width  = `${tr.width}px`;
            slider.style.height = `${tr.height}px`;
            slider.style.left   = `${tr.left - nr.left}px`;
            slider.style.top    = `${tr.top  - nr.top}px`;
        }
        
        if (navLinks.length > 0) {
            setTimeout(() => {
                const a = document.querySelector('.floating-nav a.active') || navLinks[0];
                updateSlider(a);
            }, 150);
            navLinks.forEach(link => link.addEventListener('mouseenter', (e) => updateSlider(e.currentTarget)));
        }
        
        if (navList) {
            navList.addEventListener('mouseleave', () => {
                const a = document.querySelector('.floating-nav a.active') || navLinks[0];
                updateSlider(a);
            });
        }

        function animateSliderUpdate() {
            const start = Date.now();
            const t = setInterval(() => {
                if (navLinks.length === 0) return clearInterval(t);
                const a = document.querySelector('.floating-nav a.active') || navLinks[0];
                updateSlider(a);
                if (Date.now() - start > 700) clearInterval(t);
            }, 16);
        }

        window.addEventListener('scroll', () => {
            const profileSec   = document.getElementById('profile');
            const triggerPoint = profileSec ? profileSec.offsetTop - window.innerHeight / 1.5 : window.innerHeight * 0.5;
            if (!floatingNav) return;
            if (window.scrollY > triggerPoint) {
                if (!floatingNav.classList.contains('corner-nav')) { floatingNav.classList.add('corner-nav'); animateSliderUpdate(); }
            } else {
                if (floatingNav.classList.contains('corner-nav')) { floatingNav.classList.remove('corner-nav'); animateSliderUpdate(); }
            }
        });

        document.querySelectorAll('#home, #profile, #works, #game, #ci-en, #goods').forEach(s =>
            new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navLinks.forEach(l => l.classList.remove('active'));
                        const t = document.querySelector(`.floating-nav a[href="#${entry.target.id}"]`);
                        if (t) { t.classList.add('active'); updateSlider(t); }
                    }
                });
            }, { threshold: 0.4 }).observe(s)
        );

        /* ── タブ ── */
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                const t = document.getElementById(btn.getAttribute('data-target'));
                if (t) t.classList.add('active');
            });
        });

        /* ── モーダル ── */
        const kuenadenTrigger = document.getElementById('kuenaden-trigger');
        const kuenadenModal   = document.getElementById('kuenaden-modal');
        const kuenadenClose   = document.getElementById('kuenaden-close');
        if (kuenadenTrigger) kuenadenTrigger.addEventListener('click', () => kuenadenModal.classList.add('active'));
        if (kuenadenClose)   kuenadenClose.addEventListener('click',   () => kuenadenModal.classList.remove('active'));
        if (kuenadenModal)   kuenadenModal.addEventListener('click', (e) => { if (e.target === kuenadenModal) kuenadenModal.classList.remove('active'); });

        const artTrigger = document.getElementById('art-trigger');
        const artModal   = document.getElementById('art-modal');
        const artClose   = document.getElementById('art-close');
        if (artTrigger) artTrigger.addEventListener('click', () => artModal.classList.add('active'));
        if (artClose)   artClose.addEventListener('click',   () => artModal.classList.remove('active'));
        if (artModal)   artModal.addEventListener('click', (e) => { if (e.target === artModal) artModal.classList.remove('active'); });

        /* ── インジケーター ── */
        const indicators = document.querySelectorAll('.indicator-wrap');
        const imgBox     = document.getElementById('profile-img-box');
        indicators.forEach(btn => {
            btn.addEventListener('click', () => {
                indicators.forEach(i => i.classList.remove('active'));
                btn.classList.add('active');
                imgBox.style.opacity = '0';
                setTimeout(() => { imgBox.style.opacity = '1'; }, 200);
            });
        });



        /* ── Creator モーダル ── */
        const creatorModal = document.getElementById('creator-modal');
        const creatorClose = document.getElementById('creator-modal-close');
        const creatorTimeline = document.getElementById('creator-timeline');

        const creatorData = {
            illust: {
                icon: '🎨',
                title: 'Illustration',
                sub: 'イラスト制作実績',
                items: [
                    { date: '2026.04.07', title: '白音メロ様 アイコンイラスト', desc: 'イラスト担当', url: 'https://x.com/mero_shirone' },
                    { date: '2026.03.29', title: 'しあん様 ずっと前から嫌いでした。/feat.アレナ', desc: 'イラスト担当', url: 'https://www.youtube.com/watch?v=-BUa1zSB7wU' },
                    { date: '2025.07.30', title: 'VTuber グレナデンシロップ 2ndModelβ', desc: 'デザイン／イラスト／モデリング担当', url: 'https://xfolio.jp/zh-CHT/portfolio/grenadinesyrup/works/4889959' },
                    { date: '2025.07.10', title: '藍白ゼノ様 マップ隠し用SDイラスト', desc: 'イラスト担当', url: 'https://x.com/AiziroXeno/status/1943272856781230569' },
                    { date: '2025.02.24', title: 'しあん様 オリジナル制作楽曲\n「好きすぎて、狂っているのです。」/xian（feat.みつめ）', desc: 'イラスト担当', url: 'https://www.youtube.com/watch?v=52KzUOmwNXo' },
                    { date: '2024.04.27', title: 'VTuber グレナデンシロップ 1stModel', desc: 'デザイン／イラスト／モデリング担当', url: 'https://xfolio.jp/zh-CHT/portfolio/grenadinesyrup/works/4116768' }
                ]
            },
            live2d: {
                icon: '✦',
                title: 'Live2D',
                sub: 'Live2Dモデル制作・リギング実績',
                items: [
                    { date: '2025.07.30', title: 'VTuber グレナデンシロップ 2ndModelβ', desc: 'デザイン／イラスト／モデリング担当', url: 'https://xfolio.jp/zh-CHT/portfolio/grenadinesyrup/works/4889959' },
                    { date: '2024.04.27', title: 'VTuber グレナデンシロップ 1stModel', desc: 'デザイン／イラスト／モデリング担当', url: 'https://xfolio.jp/zh-CHT/portfolio/grenadinesyrup/works/4116768' }
                ]
            },
            mv: {
                icon: '🎬',
                title: 'MV / Movie',
                sub: 'ミュージックビデオ・映像制作実績',
                items: [
                    { date: '2026.03.29', title: 'しあん様 ずっと前から嫌いでした。/feat.アレナ', desc: '動画担当', url: 'https://www.youtube.com/watch?v=-BUa1zSB7wU' },
                    { date: '2026.03.10', title: 'しあん様 個人VTuber地下アイドルプロジェクト「Petrich∅r」', desc: '動画担当', url: 'https://www.youtube.com/watch?v=PBT4m17qg1U' },
                    { date: '2025.09.10', title: 'しあん様 重音テトオリジナル楽曲「L∞P」', desc: '動画担当', url: 'https://www.youtube.com/watch?v=xkUnin_NPB0' },
                    { date: '2025.09.10', title: 'カイロ・ヒエショ様 Cover「少女レイ」', desc: '動画担当', url: 'https://www.youtube.com/watch?v=9jjx1ZQki-Q' },
                    { date: '2025.04.28', title: 'しあん様 重音テトオリジナル楽曲「Love Toxxxic」', desc: '動画担当', url: 'https://www.youtube.com/watch?v=YlHlHD-RwUc' }
                ]
            }
        };

        const illustCount = document.getElementById('illust-count');
        const live2dCount = document.getElementById('live2d-count');
        const mvCount     = document.getElementById('mv-count');
        if (illustCount) illustCount.textContent = creatorData.illust.items.length + ' works';
        if (live2dCount) live2dCount.textContent = creatorData.live2d.items.length + ' works';
        if (mvCount)     mvCount.textContent     = creatorData.mv.items.length + ' works';

        function openCreatorModal(type) {
            const d = creatorData[type];
            const iconEl  = document.getElementById('creator-modal-icon');
            const titleEl = document.getElementById('creator-modal-title');
            const subEl   = document.getElementById('creator-modal-sub');
            if (iconEl)  iconEl.textContent  = d.icon;
            if (titleEl) titleEl.textContent = d.title;
            if (subEl)   subEl.textContent   = d.sub;
            if (creatorTimeline) {
                creatorTimeline.innerHTML = d.items.map(it => `
                    <div class="tl-item">
                        <div class="tl-dot"></div>
                        <div class="tl-date">${it.date}</div>
                        <div class="tl-title">${it.title.replace(/\n/g, '<br>')}</div>
                        <div class="tl-desc">${it.desc}</div>
                        ${it.url ? `<a href="${it.url}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:5px;margin-top:6px;font-size:0.75rem;color:rgba(209,173,63,0.7);text-decoration:none;letter-spacing:1px;transition:color 0.3s;" onmouseenter="this.style.color='rgba(219,15,77,0.9)'" onmouseleave="this.style.color='rgba(209,173,63,0.7)'"><svg viewBox='0 0 24 24' fill='currentColor' style='width:13px;height:13px;'><path d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z'/></svg>View</a>` : ''}
                    </div>`).join('');
            }
            if (creatorModal) creatorModal.classList.add('active');
        }

        const openIllustBtn = document.getElementById('open-illust');
        const openLive2dBtn = document.getElementById('open-live2d');
        const openMvBtn     = document.getElementById('open-mv');
        if (openIllustBtn) openIllustBtn.addEventListener('click', () => openCreatorModal('illust'));
        if (openLive2dBtn) openLive2dBtn.addEventListener('click', () => openCreatorModal('live2d'));
        if (openMvBtn)     openMvBtn.addEventListener('click',     () => openCreatorModal('mv'));
        
        if (creatorClose) creatorClose.addEventListener('click', () => { if(creatorModal) creatorModal.classList.remove('active'); });
        if (creatorModal) creatorModal.addEventListener('click', e => { if (e.target === creatorModal) creatorModal.classList.remove('active'); });

        /* ── 支援者モーダル ── */
        const supportersModal = document.getElementById('supporters-modal');
        const supportersClose = document.getElementById('supporters-close');
        const openSupporters  = document.getElementById('open-supporters');
        if (openSupporters) openSupporters.addEventListener('click', () => { if(supportersModal) supportersModal.classList.add('active'); });
        if (supportersClose) supportersClose.addEventListener('click', () => { if(supportersModal) supportersModal.classList.remove('active'); });
        if (supportersModal) supportersModal.addEventListener('click', e => { if (e.target === supportersModal) supportersModal.classList.remove('active'); });

        // カーソルホバー対象に追加
        document.querySelectorAll('.creator-card, .cf-supporters-btn').forEach(el => {
            el.addEventListener('mouseenter', () => { if(cursorWrap) cursorWrap.classList.add('hover') });
            el.addEventListener('mouseleave', () => { if(cursorWrap) cursorWrap.classList.remove('hover') });
        });