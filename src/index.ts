import { Application, Container, Loader, Point, Sprite } from 'pixi.js'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1280,
	height: 720
});

window.addEventListener('resize', ()=>{

	const scaleY = window.innerHeight / app.screen.height; 
	const scaleX = window.innerWidth / app.screen.width; 
	const scale = Math.min(scaleX,scaleY);
	
	const gameWidth = Math.round(app.screen.width *scale);
	const gameHeight = Math.round(app.screen.height *scale);

	const marginHorizontal = Math.floor((window.innerWidth - gameWidth) / 2 );
	const marginVertical = Math.floor((window.innerHeight - gameHeight) / 2);

	if(app.view.style) {
		app.view.style.height = gameHeight + 'px';
		app.view.style.width = gameWidth + 'px';
	
		app.view.style.marginLeft = marginHorizontal + 'px';
		app.view.style.marginRight =  marginHorizontal + 'px';
		app.view.style.marginBottom = marginVertical + 'px';
		app.view.style.marginTop = marginVertical + 'px';
		

		// console.log(app.view.style.height,app.view.style.width);
	}
})
;
window.dispatchEvent(new Event("resize"));


Loader.shared.add({url: 'clampy.png', name: "clampy"});

Loader.shared.onComplete.add(()=>{
	const clampy: Sprite = Sprite.from("clampy.png");
	const clampy2: Sprite = Sprite.from("clampy.png");
	clampy.anchor.set(0.5);
	clampy.x = 300;
	clampy.y = 300;
	clampy2.anchor.set(0.5);
	clampy2.x = clampy.x + clampy.width;
	clampy2.y = clampy.y - 120;
	clampy2.angle = 180;
	
	const clampyPair: Container = new Container();

	clampyPair.scale.set(0.5)
	clampyPair.position.set(300,300)

	clampyPair.addChild(clampy);
	clampyPair.addChild(clampy2);
	const aux = clampy.parent.toLocal(new Point(0,0));
	clampy.position.set(aux.x,aux.y)


	app.stage.addChild(clampyPair)
});

Loader.shared.load();


