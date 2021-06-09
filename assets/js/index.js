const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const player = $('.player')
const heading = $('header h2')
const cd = $('.cd')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const repeatBtn = $('.btn-repeat')
const randomBtn = $('.btn-random')
const progress = $('#progress')
const playlist = $('.playlist')

const defaultImageUrl = './assets/img/logo.png'
const PLAYER_KEY = 'Kiennt-player'

const app = {
	currentIndex: 0,
	isPlaying: false,
	isRandom: false,
	isRepeat: false,
	newTime: 0,
	config: JSON.parse(localStorage.getItem(PLAYER_KEY)) || {},
	setConfig: function(key, value) {
		this.config[key] = value
		localStorage.setItem(
			PLAYER_KEY,
			JSON.stringify(this.config)
		)
	},

	songs: [
		{
			name: 'Nevada',
			singer: 'Vicetone',
			path: 'https://aredir.nixcdn.com/NhacCuaTui924/Nevada-Vicetone-4494556.mp3?st=_IjpS9u0LjapNgzm058wVw&e=1623143773',
			image: 'https://i.pinimg.com/originals/f8/6f/33/f86f3378e656883b33594f06d78d1634.jpg',
		},
		{
			name: 'Light It Up',
			singer: 'Robin Hustin x TobiMorrow',
			path: 'https://aredir.nixcdn.com/NhacCuaTui968/LightItUp-RobinHustinTobimorrowJex-5619031.mp3?st=kzpVQ5kKnf2LlcAqM6lnxg&e=1623143881',
			image: 'https://avatar-ex-swe.nixcdn.com/song/2019/01/08/1/3/d/a/1546913843457_640.jpg',
		},
		{
			name: 'Yoru ni kakeru',
			singer: 'YOASOBI',
			path: 'https://aredir.nixcdn.com/NhacCuaTui992/YoruNiKakeru-YOASOBI-6149490.mp3?st=68hnFhtGF6RukKDcDcW9Mw&e=1623132179',
			image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/16788ee5-3436-474a-84fd-6616063a1a9a/de2f4eq-bc67fa17-8dae-46a9-b85d-fe8082c34841.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE2Nzg4ZWU1LTM0MzYtNDc0YS04NGZkLTY2MTYwNjNhMWE5YVwvZGUyZjRlcS1iYzY3ZmExNy04ZGFlLTQ2YTktYjg1ZC1mZTgwODJjMzQ4NDEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dABuqANeQEs6FBfslZHdG1lW_gDwzf61yqiSABROSx0',
		},
		{
			name: 'Muộn rồi mà sao còn',
			singer: 'Sơn Tùng M-TP',
			path: 'https://aredir.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=w9AA-eyRI7yD_VYGfvVWeQ&e=1623141624',
			image: 'https://pbs.twimg.com/media/Ez5jRyVVgAQN6Kh.jpg',
		},
		{
			name: 'See You Again',
			singer: 'Charlie Puth ft Wiz Khalifa',
			path: 'https://aredir.nixcdn.com/NhacCuaTui894/SeeYouAgain-KurtSchneiderEppicAlexGoot-3888930.mp3?st=1q73myBS8FKr8Rx0snpMJw&e=1623144094',
			image: 'https://nghiennhac.com/wp-content/uploads/2020/09/see-you-again-0.jpg',
		},
		{
			name: 'Shape of You',
			singer: 'Ed Sheeran',
			path: 'https://aredir.nixcdn.com/NhacCuaTui945/ShapeOfYou-AlexGootAndieCase-5076956.mp3?st=9I9Z2TBGWNOnQRfIJDomDA&e=1623138210',
			image: 'https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/09/a0/64/09a0641c-e5fa-407e-9829-47702358ec72/190295819972.jpg/1200x1200bf-60.jpg',
		}
		,
		{
			name: 'Symphony',
			singer: 'Clean Bandit',
			path: 'https://aredir.nixcdn.com/Sony_Audio37/Symphony-CleanBanditZaraLarsson-4822950.mp3?st=sPgJSXtRXYpT_rznXyez6g&e=1623144426',
			image: 'https://i.ytimg.com/vi/PIf9GvWaxQQ/maxresdefault.jpg',
		},
		{
			name: 'Waiting For Love',
			singer: 'Avicii',
			path: 'https://aredir.nixcdn.com/Unv_Audio45/WaitingForLove-Avicii-4203283.mp3?st=mXGv6kIqbxg_coAyUqzlnw&e=1623144462',
			image: 'https://i.ytimg.com/vi/Hmbm3G-Q444/maxresdefault.jpg',
		},
		{
			name: 'Alone',
			singer: 'Marshmello',
			path: 'https://aredir.nixcdn.com/NhacCuaTui927/Alone-Marshmello-4456939.mp3?st=RTsMC9tNcKEi8fd0iKtdaA&e=1623144502',
			image: 'https://i.ytimg.com/vi/UNB8F0ObA4g/maxresdefault.jpg',
		},
		{
			name: 'Something Just Like This',
			singer: 'The Chainsmokers & Coldplay',
			path: 'https://aredir.nixcdn.com/Sony_Audio39/SomethingJustLikeThis-TheChainsmokersColdplay-5337136.mp3?st=VQuH6VgNsPlBizbk-c7n3w&e=1623144556',
			image: 'https://avatar-ex-swe.nixcdn.com/song/2017/11/07/a/1/4/5/1510038809679_640.jpg',
		},
		{
			name: 'Vách Ngọc Ngà',
			singer: 'Anh Rồng',
			path: 'https://aredir.nixcdn.com/NhacCuaTui1013/VachNgocNga-AnhRong-6984991.mp3?st=KPdZ4Nh5CcZbkuVQaSMKqw&e=1623246976',
			image: 'https://avatar-ex-swe.nixcdn.com/song/2021/03/25/0/b/f/e/1616662504016_500.jpg',
		},
		{
			name: 'Sugar',
			singer: 'Maroon 5',
			path: 'https://aredir.nixcdn.com/Unv_Audio73/Sugar-Maroon5-3338455.mp3?st=3FUWEyikJePPeAuREUcw9g&e=1623144644',
			image: 'https://i.ytimg.com/vi/7vw84EkHOlY/maxresdefault.jpg',
		},
		{
			name: 'Quan Tài Hư',
			singer: 'Young Milo',
			path: 'https://aredir.nixcdn.com/NhacCuaTui1014/QuanTaiHu-YoungMilo-6996488.mp3?st=QrUxW5V5E0CSsxXZfCwgKQ&e=1623247310',
			image: ''
		}
	],

	loadCurrentSong: function() {
		const _this = this
		const songList = $$('.song')
		const activeSong = $('.song.active')
		const currentSong = this.songs[this.currentIndex]

		// Load thông tin bài hát hiện tại
		heading.innerHTML = 
			`${currentSong.name} - ${currentSong.singer}`
		
		cdThumb.style.backgroundImage =
			currentSong.image !== '' ? 
			`url('${currentSong.image}')` :
			`url('${defaultImageUrl}')`

		audio.src = currentSong.path

		progress.value = 100

		this.setConfig('currentIndex', this.currentIndex)
		
		// Xử lý song active không cần render lại
		if(activeSong && songList.length > 0) {
			activeSong.classList.remove('active')

			songList.forEach(song => {
				if(Number(song.dataset.index) === _this.currentIndex)
					song.classList.add('active')
			})
		}
	},

	loadConfig: function() {
		if(this.config !== null) {
			this.currentIndex = this.config.currentIndex
			this.isRandom = this.config.isRandom
			this.isRepeat = this.config.isRepeat
			this.newTime = this.config.newTime
		}
	},

	render: function() {
		const _this = this

		// Render danh sánh bài hát ra view
		const htmls = this.songs.map(function (song, index) {
			return `
				<div data-index="${index}" class="song ${index === _this.currentIndex ? 'active' : ''}">
		            <div
		                class="thumb"
		                style="background-image: url('${song.image ? song.image : defaultImageUrl}');"
		            ></div>
		            <div class="body">
		                <h3 class="title">${song.name}</h3>
		                <p class="author">${song.singer}</p>
		            </div>
		            <div class="option">
		                <i class="fas fa-ellipsis-h"></i>
		            </div>
		        </div>
			`
		})

		playlist.innerHTML = htmls.join('')
	},

	handleEvents: function() {
		const _this = this
		const cdWidth = cd.offsetWidth

		// Xử lý CD quay / dừng
		const CDRotate = cdThumb.animate([
				{
					transform: 'rotate(360deg)',
				}
			],
			{
				duration: 10000,
				iterations: Infinity,
			})

		CDRotate.pause()

		// Thu nhỏ / phóng to thumb khi scroll
		document.onscroll = function() {
			const scrollTop = window.scrollY ||
				document.documentElement.scrollTop
			const newCDWidth = cdWidth - scrollTop

			cd.style.width = newCDWidth > 0 ? newCDWidth + 'px' : 0
			cd.style.opacity = newCDWidth / cdWidth
		}

		// play song on click
		playBtn.onclick = function() {
			_this.isPlaying = !_this.isPlaying
			player.classList.toggle('playing', _this.isPlaying)

			if(_this.isPlaying) {
				audio.play()
				CDRotate.play()
			}
			else {
				audio.pause()
				CDRotate.pause()
			}
		}

		// Xử lý sự kiện khi audio play
		audio.onplay = function() {
			_this.isPlaying = true
			player.classList.toggle('playing', _this.isPlaying)
		}

		// Xử lý sự kiện khi audio pause
		audio.onpause = function() {
			_this.isPlaying = false
			player.classList.toggle('playing', _this.isPlaying)
		}

		// xử lý sự kiện khi audio ended
		audio.onended = function() {
			_this.isRepeat ? audio.play() : nextBtn.click()
		}

		// Xử lý sự kiện khi update audio time current
		audio.ontimeupdate = function() {
			_this.newTime = audio.currentTime / audio.duration * 100
			progress.value = _this.newTime
			_this.setConfig('newTime', _this.newTime)
		}

		// Xử lý sự kiện khi moving progress
		progress.onchange = function (e) {
			newOffsetProgress = audio.duration / 100 * e.target.value
			audio.currentTime = newOffsetProgress
		}

		// Next song on click
		nextBtn.onclick = function() {
			if(_this.isRandom) {
				_this.playRandomSong()
			}else {
				_this.nextSong()
			}
			_this.scroolToActiveSong()
			audio.play()
		}

		// Prev song on click
		prevBtn.onclick = function() {
			if(_this.isRandom) {
				_this.playRandomSong()
			}else {
				_this.prevSong()
			}
			_this.scroolToActiveSong()
			audio.play()
		}

		// Repeat song on click
		repeatBtn.onclick = function() {
			_this.isRepeat = !_this.isRepeat
			this.classList.toggle('active', _this.isRepeat)
			_this.setConfig('isRepeat', _this.isRepeat)
		}

		// Random song on click
		randomBtn.onclick = function() {
			_this.isRandom = !_this.isRandom
			this.classList.toggle('active', _this.isRandom)
			_this.setConfig('isRandom', _this.isRandom)
		}

		// Sử lý sự kiện thay đổi active song in play list
		playlist.onclick = function(e) {
			const songActiveNode = e.target.closest('.song.active')
			const songNode = e.target.closest('.song:not(.active)')
			const optionSong = e.target.closest('.option')

			if(songActiveNode !== null) {
				_this.isPlaying = true
				audio.play()
			}

			if(songNode || optionSong) {
				if(songNode) {
					_this.currentIndex = Number(songNode.dataset.index)
					_this.loadCurrentSong()
					audio.play()
					CDRotate.play()
				}
			}

			if(optionSong) {
				console.log("You clicked option!")
			}
		}
	},

	nextSong: function() {
		this.currentIndex++;
	    if (this.currentIndex > this.songs.length - 1) {
	      this.currentIndex = 0
	    }
	    this.loadCurrentSong()
	},

	prevSong: function() {
		this.currentIndex--;
		if (this.currentIndex < 0)
			this.currentIndex = this.songs.length - 1
		this.loadCurrentSong()
	},

	playRandomSong: function() {
		let newIndex

		do {
			newIndex = Math.floor(Math.random() * this.songs.length)
		} while (newIndex === this.currentIndex)
		this.currentIndex = newIndex
		this.loadCurrentSong()
	},

	scroolToActiveSong: function() {
		setTimeout(() => {
			if(this.currentIndex <= 3) {
				$('.song.active').scrollIntoView({
					behavior: 'smooth',
					block: 'end',
				})
			}else {
				$('.song.active').scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				})
			}
		}, 300)
	},

	start: function() {
		this.loadConfig()
		this.handleEvents()
		this.loadCurrentSong()
		randomBtn.classList.toggle('active', this.isRandom)
		repeatBtn.classList.toggle('active', this.isRepeat)
		this.render()
	}
}

app.start()