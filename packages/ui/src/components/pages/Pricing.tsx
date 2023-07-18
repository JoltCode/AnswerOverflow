import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	AOHead,
	Button,
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Heading,
	Input,
	LinkButton,
} from '../primitives';
import { TextArea } from '~ui/components/primitives/base/TextArea';
import { LuCheck } from 'react-icons/lu';
import { trackEvent } from '@answeroverflow/hooks';
import { toast } from 'react-toastify';
import React from 'react';
import { classNames } from '~ui/utils/styling';

const faqs: {
	question: React.ReactNode;
	answer: React.ReactNode;
}[] = [
	{
		question: 'What happens if I go over my page view limits?',
		answer: (
			<span>
				<b>Your site will not be immediately taken down.</b> We will reach out
				to you to figure out a plan that works for you. If you are consistently
				going over your page view limits, we will ask you to upgrade to a higher
				plan.
			</span>
		),
	},
	{
		question:
			'Do you have plans for non-profit / non-commercial open source use?',
		answer:
			"We do! The limitation on the free plan page views is primarily focused on commercial use. If you're a non-profit or open source project, when you're approaching the free tier limits we will reach out to move you over to our non-profit / open source plan.",
	},
	{
		question: 'How are page views calculated?',
		answer:
			'Page views are based off of total views, not unique views. If one person views your pages 30 times and another views it 20 times, your total for page views will be 50. Page views are any page that can be viewed, for instance your homepage (/), your search page (/search) and any question pages (/m/messageId).',
	},
	{
		question: 'What if someone spams my site?',
		answer:
			'If your site is DDoSed / page views are increased by some form of artificial usage, you will not be billed for that.',
	},
	{
		question: 'What plan is right for me?',
		answer: `If you're a non profit or open source project, our free tier is great place to get started. For companies & commercial projects, the Pro plan is a great way to get content hosted on your own domain to eventually move up to the enterprise plan.`,
	},
	{
		question: 'What if I cancel my subscription?',
		answer:
			'We’ll work with you to figure out next steps to persist your content. Currently the only option is to leave your custom domain set and we will redirect from your domain back to answeroverflow.com. In the future, you will be able to self host Answer Overflow and this will be an alternative option. Our goal is to make sure all of your content stays active and working.',
	},
	{
		question:
			'What happens if I have content indexed on answeroverflow.com and I upgrade to my own domain?',
		answer:
			'All of your pages on answeroveroverflow are set as a permanent redirect to your new domain. Any visitors while the answeroverflow.com pages are still indexed in Google will be redirected to your custom domain. Eventually they will drop off and only your site will be  in search results.',
	},
	{
		question:
			'Why are my pages on answeroverflow.com doing a temporary redirect rather than a permanent one?',
		answer:
			"For the duration of your trial, your content will be doing a temporary redirect rather than a permanent redirect. This is to prevent having a lot of dead links in the event that you do not renew your subscription after your trial ends. When you're on the Pro plan, your pages do a permanent redirect.",
	},
];

const PricingFAQ = () => (
	<Accordion type="multiple" className="my-16 w-full">
		{faqs.map((faq, i) => (
			<AccordionItem
				value={`item-${i}`}
				key={i}
				className={'dark:border-neutral-700'}
			>
				<AccordionTrigger className={'text-left'}>
					{faq.question}
				</AccordionTrigger>
				<AccordionContent>{faq.answer}</AccordionContent>
			</AccordionItem>
		))}
	</Accordion>
);

const PricingElement = (props: {
	title: string;
	cta: string;
	price: string;
	bestValue?: boolean;
	features: {
		icon?: React.ReactNode;
		name: React.ReactNode;
	}[];
	clarifications?: string[];
	ctaLink: string;
}) => {
	return (
		<div
			className={classNames(
				'flex h-full flex-col items-center justify-start rounded-2xl border-2 border-ao-black/25 p-8 dark:border-ao-white/25',
				props.bestValue ? 'border-indigo-600/75 dark:border-indigo-600/75' : '',
			)}
		>
			<div className={'flex h-24 w-full flex-col items-start justify-center'}>
				{props.bestValue && (
					<p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600 dark:text-indigo-400">
						Most popular
					</p>
				)}
				<Heading.H2 className={'my-0 py-0 text-2xl font-medium'}>
					{props.title}
				</Heading.H2>
				<Heading.H3 className={'my-0 py-0 text-3xl'}>{props.price}</Heading.H3>
			</div>
			<div className="mt-8 flex h-full w-full flex-col justify-between">
				<div className="flex h-full w-full flex-col items-center justify-between gap-4">
					<ul className="grid w-full grid-cols-1 items-center gap-2">
						{props.features.map((feature, index) => (
							<li key={index} className="flex w-full flex-row gap-4">
								{feature.icon ?? <LuCheck className="h-6 w-6 shrink-0" />}
								{feature.name}
							</li>
						))}
					</ul>
					<div className="flex flex-col items-center justify-center gap-2">
						{props.clarifications?.map((clarification, index) => (
							<div
								key={index}
								className="flex w-full flex-row gap-2 text-neutral-600 dark:text-neutral-400"
							>
								<span>{clarification}</span>
							</div>
						))}
					</div>
				</div>
				<LinkButton className={'mt-4 w-full'} href={props.ctaLink}>
					<b>{props.cta}</b>
				</LinkButton>
			</div>
		</div>
	);
};

const ProPlan = (props: { ctaLink: string }) => (
	<PricingElement
		title={'Pro'}
		cta={'Start Free Trial'}
		price={'$25 / month'}
		features={[
			{
				name: 'Hosted on your own domain',
			},
			{
				name: 'Up to 50,000 monthly page views',
			},
			{
				name: 'Basic analytics (coming soon)',
			},
		]}
		ctaLink={props.ctaLink}
	/>
);

const EnterprisePlan = (props: { ctaLink: string }) => (
	<PricingElement
		title={'Enterprise'}
		cta={'Start Free Trial'}
		price={'$150 / month'}
		features={[
			{
				name: 'Hosted on your own domain',
			},
			{
				name: 'Up to 300,000 monthly page views',
			},
			{
				name: 'Advanced analytics (coming soon)',
			},
			{
				name: 'Priority support',
			},
		]}
		ctaLink={props.ctaLink}
		clarifications={[
			'If you need more than 300k page views, we will work with you to figure out a custom plan',
		]}
	/>
);
const PricingOptions = () => (
	<div className="mx-auto my-16 grid  grid-cols-1 gap-16 md:grid-cols-3">
		<PricingElement
			title={'Free'}
			cta={'Setup Now'}
			price={'$0 / month'}
			features={[
				{
					name: 'Hosted on answeroverflow.com',
				},
				{
					name: 'Up to 30,000 monthly page views',
				},
			]}
			clarifications={[
				'Upgrade to your own domain at any time and your content will be redirected',
			]}
			ctaLink={'/onboarding'}
		/>
		<ProPlan ctaLink={'/dashboard'} />
		<EnterprisePlan ctaLink={'/dashboard'} />
	</div>
);

export const Pricing = () => {
	return (
		<div className="my-6 max-w-6xl sm:mx-3 md:mx-auto">
			<AOHead
				path="/pricing"
				title="Pricing"
				description={
					'Index your Discord server content into Google, starting at $0/month '
				}
			/>

			<Heading.H1 className={'text-center'}>Plans</Heading.H1>
			<PricingOptions />
			<PricingFAQ />
			<form
				className="mx-auto my-16 flex  max-w-2xl flex-col gap-4"
				onSubmit={(e) => {
					e.preventDefault();
					// @ts-ignore
					const [emailElement, feedbackElement] = e.target;
					const email = (emailElement as HTMLInputElement).value;
					const feedback = (feedbackElement as HTMLTextAreaElement).value;
					trackEvent('Pricing Feedback', {
						email,
						feedback,
					});
					toast.success('Feedback submitted thanks!');
				}}
			>
				<Heading.H2>Pricing Feedback</Heading.H2>
				<Input
					placeholder={'email (optional)'}
					type={'email'}
					autoComplete={'email'}
				/>
				<TextArea
					className="h-32"
					placeholder={
						'What do you think of our pricing? What would you like to see?'
					}
					minLength={1}
					required
					inputMode={'text'}
				/>
				<Button>Submit</Button>
			</form>
		</div>
	);
};

export const PricingDialog = (props: {
	proPlanCheckoutUrl: string;
	enterprisePlanCheckoutUrl: string;
}) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Start free trial</Button>
			</DialogTrigger>
			<DialogContent className="max-h-screen max-w-5xl overflow-y-auto bg-white">
				<DialogHeader>
					<DialogTitle>Pick a plan</DialogTitle>
				</DialogHeader>
				{/* TODO: If the server has more than 50k page views don't show pro plan */}
				<div className="mx-auto my-16 grid w-full grid-cols-1 gap-16  md:grid-cols-2">
					<ProPlan ctaLink={props.proPlanCheckoutUrl} />
					<EnterprisePlan ctaLink={props.enterprisePlanCheckoutUrl} />
				</div>
				<DialogFooter>
					<LinkButton href={'/pricing'}>Learn more</LinkButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
