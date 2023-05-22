export const splitContentLines = (content: string) => {
	const newContent = content.trim().split('');
	let trimmedContent = '';
	const skipIterations: number[] = [];

	newContent.forEach((element, index) => {
		if (skipIterations.includes(index)) {
			return;
		}

		if (element === '\n') {
			trimmedContent += '\n';

			const loopForwardsContent = newContent.slice(index);
			loopForwardsContent: for (const [
				innerCharIndex,
				innerChar,
			] of loopForwardsContent.entries()) {
				if (/^\s*$/.test(innerChar)) {
					skipIterations.push(innerCharIndex + index);
				} else {
					break loopForwardsContent;
				}
			}
		} else {
			trimmedContent += element;
		}
	});

	return trimmedContent.split('\n');
};
