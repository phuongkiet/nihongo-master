import type { Lesson } from '../types';

// Load all JSON files in the lessons directory using Vite's eager glob import
const modules = import.meta.glob<{ default: Lesson[] | Lesson }>('./lessons/*.json', { eager: true });
let lessons: Lesson[] = [];

for (const key in modules) {
	const mod = modules[key];
	const data = mod?.default ?? mod;
	if (Array.isArray(data)) {
		lessons = lessons.concat(data);
	} else if (data) {
		lessons.push(data);
	}
}

export const lessonsData: Lesson[] = lessons.sort((a, b) => a.id - b.id);


