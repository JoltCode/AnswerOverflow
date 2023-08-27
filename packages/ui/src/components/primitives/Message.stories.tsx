import type { Story } from '@ladle/react';
import { loremIpsum } from 'lorem-ipsum';
import { Message, type MessageProps } from './Message';
import {
	mockDiscordAccount,
	mockMessageWithDiscordAccount,
} from '~ui/test/props';

const args = {
	argTypes: {
		collapseContent: {
			control: {
				type: 'range',
				if: {
					arg: 'collapseContent',
				},
				min: 0,
				max: 4000,
				step: 1,
				defaultValue: 0,
			},
		},
	},
};

export default args;

export const Primary: Story<MessageProps> = (props) => <Message {...props} />;
Primary.args = {
	message: mockMessageWithDiscordAccount(),
};

export const WithDefaultEmojis = Primary.bind({});
WithDefaultEmojis.args = {
	...Primary.args,
	message: {
		...mockMessageWithDiscordAccount(),
		content: 'Hello \ud83d\ude40 \ud83d\ude40, with unescaped 🙀 🙀',
	},
};

export const WithDiscordEmojis = Primary.bind({});
WithDiscordEmojis.args = {
	...Primary.args,
	message: {
		...mockMessageWithDiscordAccount(),
		content: 'Hello <:github-2:1081060505122263154> <:blobcat:123456789>',
	},
};

export const OverflowLetters = Primary.bind({});

OverflowLetters.args = {
	...Primary.args,
	message: {
		...mockMessageWithDiscordAccount(),
		content:
			'Helloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
		author: mockDiscordAccount(),
	},
};

export const SuperLongMessage = Primary.bind({});

SuperLongMessage.args = {
	...Primary.args,
	message: {
		...mockMessageWithDiscordAccount(),
		// (3674 characters - discord nitro is max 4000 characters)
		content: loremIpsum({
			count: 250,
		}),
		author: mockDiscordAccount(),
	},
};

export const SuperLongMessageCollapsed = Primary.bind({});

SuperLongMessageCollapsed.args = {
	...Primary.args,
	collapseContent: 500,
	message: {
		...mockMessageWithDiscordAccount(),
		// (3674 characters - discord nitro is max 4000 characters)
		content: loremIpsum({
			count: 250,
		}),
		author: mockDiscordAccount(),
	},
};

export const WithSingularImage = Primary.bind({});
WithSingularImage.args = {
	...Primary.args,
	message: {
		...mockMessageWithDiscordAccount(),
		channelId: '1031266112802914305',
		serverId: '701008832645824553',
		attachments: [
			{
				url: 'https://cdn.discordapp.com/attachments/1037547270733832242/1063119696334966794/image.png',
				width: 897,
				height: 672,
				filename: 'image.png',
				size: 123456,
				id: '123456789',
				proxyUrl:
					'https://cdn.discordapp.com/attachments/1037547270733832242/1063119696334966794/image.png',
			},
		],
	},
};

export const WithSingularRandomFileAttachment = Primary.bind({});
WithSingularRandomFileAttachment.args = {
	...Primary.args,
	message: {
		...mockMessageWithDiscordAccount(),
		channelId: '1031266112802914305',
		serverId: '701008832645824553',
		attachments: [
			{
				url: 'https://cdn.discordapp.com/attachments/1037547270733832242/1063119696334966794/image.randomExtension',
				width: 897,
				height: 672,
				filename: 'image.randomExtension',
				size: 123456,
				id: '123456789',
				proxyUrl:
					'https://cdn.discordapp.com/attachments/1037547270733832242/1063119696334966794/image.randomExtension',
			},
		],
	},
};

export const WithMultipleImages = Primary.bind({});
WithMultipleImages.args = {
	...Primary.args,
	message: {
		...mockMessageWithDiscordAccount(),
		channelId: '1031266112802914305',
		serverId: '701008832645824553',
		attachments: [
			{
				url: 'https://cdn.discordapp.com/attachments/1037547270733832242/1063119696334966794/image.png',
				width: 897,
				height: 672,
				filename: 'image.png',
				size: 123456,
				id: '123456789',
				proxyUrl:
					'https://cdn.discordapp.com/attachments/1037547270733832242/1063119696334966794/image.png',
			},
			{
				url: 'https://cdn.discordapp.com/attachments/1037547270733832242/1063121784578261033/image.png',
				width: 1440,
				height: 2560,
				size: 123456,
				id: '123456789',
				filename: 'image.png',
				proxyUrl:
					'https://cdn.discordapp.com/attachments/1037547270733832242/1063119696334966794/image.png',
			},
			{
				url: 'https://cdn.discordapp.com/attachments/1037547270733832242/1063121784578261033/image.png',
				width: null,
				height: null,
				size: 123456,
				filename: 'image.png',
				id: '123456789',
				proxyUrl:
					'https://cdn.discordapp.com/attachments/1037547270733832242/1063119696334966794/image.png',
			},
			{
				url: 'https://cdn.discordapp.com/attachments/1079799320745877547/1105532764821930095/image.png',
				width: null,
				height: null,
				filename: 'image.png',
				size: 123456,
				id: '123456789',
				proxyUrl:
					'https://cdn.discordapp.com/attachments/1079799320745877547/1105532764821930095/image.png',
			},
			{
				url: 'https://cdn.discordapp.com/attachments/1079799320745877547/1105533000881545336/image.png',
				width: null,
				height: null,
				filename: 'image.png',
				size: 123456,
				id: '123456789',
				proxyUrl:
					'https://cdn.discordapp.com/attachments/1079799320745877547/1105533000881545336/image.png',
			},
			{
				url: 'https://media.discordapp.net/attachments/1079799320745877547/1105533166812410018/image.png',
				width: null,
				height: null,
				filename: 'image.png',
				size: 123456,
				id: '123456789',
				proxyUrl:
					'https://media.discordapp.net/attachments/1079799320745877547/1105533166812410018/image.png',
			},
		],
	},
};

export const WithCode = Primary.bind({});
WithCode.args = {
	...Primary.args,
	message: {
		...mockMessageWithDiscordAccount(),
		content: `
      \`\`\`ts
    const variable = 'hello';

    function getProfile(id: string): {
      name: string; address: string, photo: string
    } {
      return {
        name: 'ben', address: "ben's house", photo: "/ben.png"
      };
    }
      \`\`\`
    `,
	},
};

export const WithPythonCode = Primary.bind({});
WithPythonCode.args = {
	...Primary.args,
	message: {
		...mockMessageWithDiscordAccount(),
		content: `
      \`\`\`python
    def get_profile(id: str) -> dict:
      return {
        'name': 'ben', 'address': "ben's house", 'photo': "/ben.png"
      }
      \`\`\`
    `,
	},
};

export const WithXSS = Primary.bind({});
WithXSS.args = {
	...Primary.args,
	message: {
		...mockMessageWithDiscordAccount(),
		content: "<script> alert('XSS')</script>",
	},
};

export const WithXSSInCodeBlock = Primary.bind({});
WithXSSInCodeBlock.args = {
	...Primary.args,
	message: {
		...mockMessageWithDiscordAccount(),
		content: "```<script> alert('XSS')</script>```",
	},
};

export const Blurred = Primary.bind({});
Blurred.args = {
	...Primary.args,
	message: {
		...mockMessageWithDiscordAccount(),
		public: false,
	},
};

export const WithLink = Primary.bind({});
WithLink.args = {
	...Primary.args,
	message: {
		...mockMessageWithDiscordAccount(),
		content: 'Maybe try Googling your question first https://google.com',
	},
};

export const WithTitles = Primary.bind({});

WithTitles.args = {
	...Primary.args,
	message: {
		...mockMessageWithDiscordAccount(),
		content: `# Title 122\n## Title 2\n### Title 3\n#### Title 4\n##### Title 5\n###### Title 6`,
	},
};

export const WithLotsOfMarkdown = Primary.bind({});
WithLotsOfMarkdown.args = {
	...Primary.args,
	message: {
		...mockMessageWithDiscordAccount(),
		content: `# Title 122\n## Title 2\n### Title 3\n#### Title 4\n##### Title 5 \n###### Title 6
- list item 1
- list item 2
- list item 3
- list item 4

1. list item 1
2. list item 2
3. list item 3
4. list item 4

> quote

**bold**

*italic*

~~strikethrough~~

__underline__

[link](https://google.com)


\`\`\`typescript
const variable = 'hello';
\`\`\`

# More text

Table:

| Item         | Price     | # In stock |
|--------------|-----------|------------|
| Juicy Apples | 1.99      | *7*        |
| Bananas      | **1.89**  | 5234       |

    `,
	},
};
