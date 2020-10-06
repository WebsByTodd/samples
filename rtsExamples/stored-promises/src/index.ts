const asyncFunc = (): Promise<void> => {
	return new Promise(res => {
		setTimeout(() => {
			console.log("short timer expired");
			res();
		}, 1000);
	});
}

const asyncFunc2 = (): Promise<void> => {
	return new Promise(res => {
		setTimeout(() => {
			console.log("long timer expired");
			res();
		}, 5000);
	});
}

const main = () => {
	const promises: Promise<void>[] = [asyncFunc(), asyncFunc2()];

	const sub1 = () => {
		promises[0].then(() =>{
			console.log("promise 0 resolved in sub1");
		});
	}

	const sub2 = () => {
		promises[0].then(() =>{
			console.log("promise 0 resolved in sub2");
		})
	}

	promises[1].then(() =>{
		sub1();
		sub2();
	})
}

main();
