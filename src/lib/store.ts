import { writable, readable, derived } from 'svelte/store';

/**
 * 구독 메서드가 있는 객체를 반환한다.
 * 스토어 값이 변경될 때마다 이해 관계자에게 알림을 받을 수 있습니다.
 */
const createCount = () => {
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		increment: () => update((n) => n + 1),
		decrement: () => update((n) => n - 1),
		reset: () => set(0)
	};
};
/**
 * 객체가 구독 메서드를 올바르게 구현하기만 하면 스토어입니다.
 * 그 외에는 모든 것이 가능합니다. 따라서 도메인별 로직으로 사용자 정의 스토어를 만드는 것은 매우 쉽습니다.
 */
export const count = createCount();
// 값이 변경되면 알림을 받는다.
// count.subscribe(value => {
//   console.log(value);
// });

// count.set(1);

// count.update(value => value + 1);

// onDestroy를 통해서 구독한 스토어을 해제할 수 있다.
// $를 사용하여 구독, 할당 해제에 대한 내용을 함축시킬 수 있다.
// <h1>The count is {$count}</h1>

export const time = readable(new Date(), function start(set) {
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});

// 파생된 값을 사용하여 하나 이상의 다른 스토어 값을 기반으로 하는 스토어를 만들 수 있습니다.
const start = new Date();

export const elapsed = derived(
	time,
	($time) => Math.round(($time.getTime() - start.getTime()) / 1000)
);

export const storeName = writable('world');

export const greeting = derived(storeName, ($storeName) => `Hello ${$storeName}!`);
