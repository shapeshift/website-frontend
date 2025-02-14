'use client';

import React from 'react';

import type {ReactNode} from 'react';

export default function TermsOfServicePage(): React.ReactNode {
	return (
		<main className={'terms-of-service mx-auto mt-40 max-w-[800px] px-4 py-8'}>
			<h1 className={'mb-4 text-[40px] leading-[52px]'}>{'Terms of Service'}</h1>
			<p className={'mb-16 text-sm text-gray-500'}>{'Last Modified: January 24, 2023'}</p>
			<p className={'mb-16 text-2xl font-normal'}>
				{
					'THESE TERMS CONSTITUTE A LEGALLY BINDING AGREEMENT BETWEEN YOU AND US. PLEASE READ THESE TERMS CAREFULLY TO ENSURE THAT YOU UNDERSTAND AND AGREE TO EVERY PORTION OF THESE TERMS BEFORE USING ANY PART OF THE SERVICE.'
				}
			</p>

			<p className={'mb-7'}>
				{
					'These terms of service (these "Terms" or the "Terms") govern your: relationship with Fox Foundation, a nonprofit foundation formed in Lichtenstein ("ShapeShift", "we", "our", or "us"); and use or access of: (1) ShapeShift.com, ShapeShift.io, and any other website maintained or published by ShapeShift (each, a "Website"); (2) our software platform which enables you to hold, transfer, buy, sell, or interact with certain smart contracts ("Platform"); (3) our mobile application, which allows access to one or more of our Websites or the Platform from a mobile device ("App"); (4) any application programming interface we provide ("API"); and (5) any other of our online or mobile services or software ("Software") provided on or in connection with our service to hold, transfer, buy, sell, or enable the sale of, certain digital assets (the Websites, the Platform, the App, the API, and the Software, collectively, the "Service"). By accessing or using any part of the Service, or clicking a button or checking a box marked "I Agree" (or substantially similar language), you acknowledge that you have read, understood, acknowledge, and agree to: (i) be bound by these Terms in full; and (ii) to our '
				}{' '}
				<a
					className={'underline'}
					href={'/privacy-policy'}>
					{'privacy policy'}
				</a>
				{
					', which is incorporated into these Terms ("Privacy Policy") and includes certain rights granted to us for the collection and use of your information. These Terms apply to any visitor of a Website, user of the Service, and any other person who registers for or otherwise accesses or uses the Service (each, a "User"). Certain parts of the Service may be subject to additional terms that we may specify from time to time, and your use of such Service is subject to those additional terms. Such additional terms are hereby incorporated into these Terms.'
				}
			</p>

			<p className={'mb-7'}>
				{
					'ShapeShift may, in its sole discretion, modify or update these Terms from time to time, so you should review this page periodically. When we change these Terms in a material manner, we will update the date at the top of this page. Your continued use of the Service after any such change constitutes your acceptance of such change to these Terms. If you do not agree to any portion of these Terms or any future terms of service including future versions of these Terms, you must not use or access (or continue to access) the Service.'
				}
			</p>

			<p className={'mb-16'}>
				{
					'INVESTMENT DISCLAIMER: ShapeShift does not endorse or recommend any particular digital asset, transaction, or purchasing strategy. Content on any of the Websites or your communications with any of our personnel should not be construed as purchase or investment advice. You should seek independent investment advice prior to using the Service. You acknowledge and represent that all transaction decisions made in connection with your use of the Service are made solely by you and ShapeShift will have no liability for any of your decisions. THE RISK OF LOSS IN BUYING OR SELLING A DIGITAL ASSET CAN BE SUBSTANTIAL, THEREFORE YOU SHOULD CAREFULLY CONSIDER WHETHER BUYING OR SELLING A DIGITAL ASSET IS SUITABLE FOR YOU IN LIGHT OF YOUR FINANCIAL CONDITION BEFORE BUYING OR SELLING A DIGITAL ASSET.'
				}
			</p>
			<ol className={'list-roman space-y-6 pl-6'}>
				{/* i. Use of the Service */}
				<li>
					<h2 className={'mb-4 text-2xl'}>{'Use of the Service'}</h2>
					<ol className={'list-decimal space-y-4 pl-6'}>
						<li>
							<span className={'font-semibold'}>{'Eligibility to use the Service. '}</span>
							{
								"You shall not use the Service unless you are in full compliance with these Terms and all applicable laws. You shall not use any part of the Service if you cannot form a legally binding contract with ShapeShift. Any use of or access to the Service by anyone under 18 is prohibited. Currently, we do not allow Users residing or present in the following jurisdictions to use the Service: the State of New York, the State of Washington, any jurisdiction sanctioned by the United States Treasury's Office of Foreign Assets Control, or any other jurisdiction that we determine to present a high risk of fraud. You shall not use the Service if: (i) you reside or are present in one of the jurisdictions listed in the previous sentence; (ii) we determine that you violated these Terms; or (iii) we have removed or suspended you from using the Service."
							}
						</li>
						<li>
							<span className={'font-semibold'}>{'The Service Generally. '}</span>
							{
								'Generally, the purpose of the Service is to allow Users to hold, buy, sell, and transfer digital assets (buying, selling, or otherwise transferring a digital asset on our Service, referred to as a "Transaction"). Click here for an overview on how to trade digital assets on our Service. OUR SERVICE IS NON-CUSTODIAL, MEANING SHAPESHIFT NEVER TAKES CONTROL OF THE DIGITAL ASSETS THAT INTERACT WITH OUR SERVICE. You may be charged a miner or network fee to process the Transaction on your behalf (a "Miner Fee"). ShapeShift calculates the Miner Fee for a particular digital asset in its discretion. ShapeShift shall maintain a list of current Miner Fees here or on another page of the Website, however at the time of your Transaction, the particular Miner Fee may deviate from such list. ShapeShift shall notify you of the Miner Fee applicable to your Transaction before your authorization of the Transaction. ShapeShift may modify or update any portion of the Service at any time. Subject to your full compliance with these Terms, you are hereby granted a non-exclusive, limited, non-transferable, freely revocable license to access and use the Service for your personal use only and as permitted by the features of the Service ("Service License"). You shall not use any part of the Service for illegal or fraudulent purposes or for the purpose of consummating Transactions on behalf of another person. For the avoidance of doubt, you must be the beneficial owner of the digital assets, the sending address, the destination address, and the refund address for each Transaction you initiate on the Service. ShapeShift reserves all rights not expressly granted in these Terms in the Service and the ShapeShift Content (as defined below). ShapeShift may terminate the Service License or any portion of the Service at any time for any or no reason.'
							}
						</li>
						<li>
							{
								'Suspension or Termination of the Service. You acknowledge that we may, without prior notice to you: suspend the Service; change the Service; stop providing the Service or features of the Service, to you or to Users generally; or create usage or Transaction limits on the Service.'
							}
						</li>
						<li>
							{
								'Third-Party Integrations. You acknowledge that the Service may contain links or integrations to third-party (i.e., not ShapeShift or any of our affiliates) materials, services, or software that are not owned or controlled by us, including smart contracts (each, a "Third-Party Service"). We do not endorse or assume any responsibility for any Third-Party Service. IF YOU ACCESS A THIRD-PARTY SERVICE FROM THE SERVICES OR SHARE ANY CONTENT ON OR THROUGH SUCH THIRD-PARTY SERVICE, YOU ACKNOWLEDGE THAT: YOU DO SO AT YOUR OWN RISK; THESE TERMS AND OUR PRIVACY POLICY MAY NOT APPLY TO SUCH THIRD-PARTY SERVICE; YOU MAY BE REQUIRED BY SUCH THIRD-PARTY TO AGREE TO CERTAIN ADDITIONAL TERMS OR CREATE AN ACCOUNT; AND THAT CERTAIN THIRD-PARTY SERVICES MAY PUBLISH TO A PUBLIC BLOCKCHAIN INFORMATION YOU SEND TO SUCH THIRD-PARTY. You shall not hold us liable for any damages you incur related to your use of any Third-Party Service. You acknowledge that your dealings or participation in promotions with any advertiser that connects with you through the Service—as well as payment or delivery of goods and any other terms (such as warranties)—are solely between you and that advertiser.'
							}
						</li>
						<li>
							{
								'DEX Trading. Through our Services, we offer the ability to connect to a Third-Party Service that allows you to trade digital assets on a decentralized exchange ("DEX"). You expressly acknowledge that we do not control or maintain the DEXs you may connect with through our Services, nor are we a party to any transaction on a DEX on our Service. You further acknowledge that we will have no liability for any interaction you have with a DEX. Further, you acknowledge that we cannot reverse or refund any transaction that occurs on a DEX. Prior to completing a trade on a DEX, it is solely your responsibility to conduct due diligence on the DEX, the assets being traded, and the underlying smart contract(s).'
							}
						</li>
						<li>
							{
								'Liquidity Rewards. Through the Service, you may deposit a pair of certain digital assets into a liquidity pool entirely facilitated by a Third-Party Service enabling you to possibly earn returns on those digital assets ("Liquidity Mining"). When used in connection with Liquidity Mining, "APR" means: the estimated annual percentage return for a certain pair of digital assets, calculated based on the prior 24 hours of accrued liquidity fees divided by total liquidity for that pair of digital assets, except that "FOX Bonus APR" means the estimated annual percentage returned in bonus FOX Tokens (defined in section ix) rewarded by us in connection with Liquidity Mining of FOX Token-ETH pairs and calculated as follows:'
							}
						</li>
						<li>
							{
								'1.) Total amount of FOX Tokens awarded per block (as determined by ShapeShift), in the aggregate, times the annualized estimated amount of ETH blocks mined, times current USD value of FOX; divided by'
							}
						</li>
						<li>
							{
								'2.) The value of FOX-ETH UniswapV2 liquidity pool tokens currently staked in this smart contract. APR figures may include estimated FOX bonus awards where the context dictates inclusion of FOX Bonus APR.'
							}
						</li>
					</ol>
				</li>

				{/* ii. User Accounts */}
				<li>
					<h2 className={'mb-2 text-2xl font-semibold'}>{'User Accounts'}</h2>
					<p>
						{
							'ShapeShift Accounts. You may be required to sign up for a ShapeShift account ("Account") in order to use certain portions of the Service. We strongly recommend that when creating your Account, you use strong passwords that contain a combination of uppercase and lowercase letters, numbers, and symbols. You shall notify ShapeShift immediately of any breach of security or unauthorized use of your Account by emailing our customer support here or making a support request here. ShapeShift will not be liable for any losses you incur that are caused by any unauthorized use of your Account. Your Account gives you access to the Service and any other functionality that we may establish and maintain. If you open an Account on behalf of an organization, then for these Terms "you" includes that organization – meaning (i) you represent that you are an authorized representative with the authority to bind the organization to these Terms, (ii) you agree to these Terms on its behalf, and (iii) if you cease to be such a representative, you shall stop using the Service on its behalf. You shall not use another User\'s Account. When creating your Account, provide complete and accurate information and keep it updated. You may delete your Account through your Account settings or by emailing us here. Note: no refunds are provided upon Account deletion.'
						}
					</p>
					<p>
						{
							'Verification. You must provide any information requested for identity verification and for detecting money laundering, terrorist financing, fraud, or any financial crime; you consent to our record-keeping of that information. We may perform inquiries (directly or via third-parties) to verify your identity or prevent financial crimes, and you consent to any such disclosures. You are solely responsible for all activity on your Account and must keep your password secure.'
						}
					</p>
					<p>
						{
							'Your Email Address. By providing your email to ShapeShift, you consent to receiving ShapeShift- or Service-related notices (including legal notices) via email instead of postal mail. To opt out of emails, use the "unsubscribe" link in any ShapeShift email. Note that opting out may prevent you from receiving crucial Service updates.'
						}
					</p>
					<p>
						{
							"Service Rules. You shall not engage in any Prohibited Activity including but not limited to modifying, reverse engineering, renting or reselling any part of the Service; using the Service for time-sharing; automated scraping; sending unsolicited emails; interfering with the Service's integrity; overloading our infrastructure; uploading harmful software; harvesting personal data; impersonation; bypassing security features; or deleting copyright notices."
						}
					</p>
					<p>
						{
							'Suspension or Termination of your Account. We may suspend or terminate your access, deactivate or cancel your Account, or block any Transaction if (i) required by law or a court order; (ii) if we suspect misuse; (iii) if your Account is under litigation or investigation; (iv) if we believe there is a heightened risk of non-compliance; (v) if you attempt to circumvent our controls (such as by opening multiple Accounts or violating promotional terms); or (vi) for any other reason at our sole discretion. Even if terminated, you remain bound by these Terms.'
						}
					</p>
				</li>

				{/* iii. Transactions on the Service */}
				<li>
					<h2 className={'mb-2 text-2xl font-semibold'}>{'Transactions on the Service'}</h2>
					<p>
						{
							'Digital Wallet. You may need to create or link a digital wallet with the Service in order to initiate and complete Transactions. WHEN YOU CREATE A NEW DIGITAL WALLET, YOU MUST REMEMBER OR WRITE DOWN THE ASSOCIATED ACCOUNT EMAIL, PASSWORD, AND RECOVERY PHRASE TO RETAIN ACCESS TO YOUR DIGITAL ASSETS. You are solely responsible for managing your wallet and digital assets. Loss of passwords or recovery phrases means you alone bear any resulting loss—ShapeShift is not liable.'
						}
					</p>
					<p>
						{
							'Digital Asset Prices. We use Third-Party Services to determine prices for digital assets. Although we use good-faith efforts to provide accurate pricing and Transaction fee information, such data is inherently volatile and subject to change instantly. Price details are provided when your payment is confirmed on the blockchain.'
						}
					</p>
					<p>
						{
							'Transactions Generally. We reserve the right to refuse, delay, or cancel any Transaction if required by law, if there is a fraud risk, or due to technical issues with blockchain or the Service. Once a Transaction is initiated and broadcast to the network, it may not be reversed or changed.'
						}
					</p>
					<p>
						{
							'Payments. We decide when to accept any payment on the Service. A payment broadcasted to the blockchain does not automatically mean we have accepted it. You may elect to receive a guaranteed price by using the "Precise Amount" feature—if payment is received and accepted within that period.'
						}
					</p>
					<p>
						{
							'Digital Assets. ShapeShift does not guarantee that every asset will be listed. We reserve the right to add or remove digital assets, and you must not use the Service for digital assets we do not support.'
						}
					</p>
					<p>
						{
							"Underlying Protocols. The underlying software protocols of the Service are open source. You acknowledge that (i) ShapeShift does not own these protocols; (ii) we are not responsible for their operation; and (iii) sudden changes may affect the Service's functionality."
						}
					</p>
					<p>
						{
							'Digital Asset Forks. In the event of a fork, (i) ShapeShift may suspend operations temporarily; (ii) we may not support both forks; (iii) we will honor only the originally-intended Transaction; and (iv) we assume no liability for damages relating to unsupported forks.'
						}
					</p>
					<p>
						{
							'Taxes. It is your responsibility to determine any applicable taxes for Transactions and to remit those taxes accordingly. Your Transaction history is available in your Account settings.'
						}
					</p>
				</li>

				{/* iv. User Feedback and Ideas */}
				<li>
					<h2 className={'mb-2 text-2xl font-semibold'}>{'User Feedback and Ideas'}</h2>
					<p>
						{
							'User Feedback and Ideas. You may submit feedback, suggestions, or ideas about the Service or ShapeShift in general (each, an "Idea"). By doing so, you agree that your submission is gratuitous and non-confidential, and that ShapeShift is free to use it without any additional compensation.'
						}
					</p>
				</li>

				{/* v. The ShapeShift App */}
				<li>
					<h2 className={'mb-2 text-2xl font-semibold'}>{'The ShapeShift App'}</h2>
					<p>
						{
							'Generally. To use the App, you must have a compatible mobile device. You may incur additional data charges from your wireless provider. You are solely responsible for such charges. ShapeShift grants you a non-exclusive, non-transferable, revocable license (the "App License") to use the compiled App on your own mobile device. This license does not constitute a sale of the App.'
						}
					</p>
					<p>
						{
							"Additional Apple App Store Terms. If you obtain the App from Apple's App Store, note that (i) these Terms are solely between you and ShapeShift; (ii) Apple is not a party to these Terms; and (iii) Apple's own terms prevail if there is a conflict. The App License is limited to use on Apple-branded products you own, and ShapeShift and Apple have no obligation to provide maintenance or support."
						}
					</p>
					<p>
						{
							"Google Play Store Terms. If you downloaded the App from Google's Play Store and a conflict arises, Google's Play Store terms will prevail."
						}
					</p>
				</li>

				{/* vi. Our Proprietary Rights */}
				<li>
					<h2 className={'mb-2 text-2xl font-semibold'}>{'Our Proprietary Rights'}</h2>
					<p>
						{
							'Subject to article IV, all materials transferred via the Service—including software, images, text, graphics, logos, patents, trademarks, copyrights, audio, videos, music, and other content ("ShapeShift Content")—and any Intellectual Property Rights therein are the exclusive property of ShapeShift and its licensors. Nothing in these Terms creates a license under any such rights, and you shall not sell, modify, or otherwise distribute ShapeShift Content without our prior written consent.'
						}
					</p>
				</li>

				{/* vii. Privacy & Security */}
				<li>
					<h2 className={'mb-2 text-2xl font-semibold'}>{'Privacy &amp; Security'}</h2>
					<p>
						{
							'ShapeShift respects your privacy and will only request information necessary for Service use or to comply with law. Due to blockchain transparency, Transactions are public. Attempts to obscure Transaction details are ineffective, and law enforcement may access any blockchain data. We reserve the right to provide information as required by legal process.'
						}
					</p>
					<p>
						{
							'ShapeShift takes reasonable measures to secure your personal information; however, we cannot guarantee complete security. By providing your personal information, you do so at your own risk. For more details on our security practices, please see our security policy.'
						}
					</p>
				</li>

				{/* viii. Returns and Refunds Policy */}
				<li>
					<h2 className={'mb-2 text-2xl font-semibold'}>{'Returns and Refunds Policy'}</h2>
					<p>
						{
							'Refunds Generally. This article (viii) does not apply to any Transaction after April 13, 2021. ShapeShift does not generally issue refunds for Transactions initiated or completed on a DEX. If a Transaction where ShapeShift is the counterparty fails, the "Order Status" page will indicate whether the digital asset sold will be refunded or if the outgoing asset will be sent. Refunds will be made in a form that may differ from the original asset\'s cryptocurrency value.'
						}
					</p>
					<p>
						{
							'Seeking a Refund Manually. To request a refund for a failed Transaction, you must promptly contact our customer support (via email or support request) and provide a refund address. Failure to do so may delay or prevent the refund.'
						}
					</p>
					<p>
						{
							"Refund Fees. All Transactions from ShapeShift to a User's outgoing wallet are subject to posted fees, which may be deducted from any refund."
						}
					</p>
					<p>
						{
							"Refund Period. THERE IS NO OBLIGATION TO RETURN A DIGITAL ASSET if a refund request is made more than 90 days after the Transaction's initiation."
						}
					</p>
					<p>
						{
							'Unsupported Digital Assets. Digital assets sent mistakenly to an unsupported wallet cannot be recovered. ShapeShift reserves the right to decide individually whether to assist with such issues.'
						}
					</p>
					<p>
						{
							'Minimum Refund Amounts. Transactions below the posted fee threshold will not be refunded due to Miner Fee and administrative cost constraints.'
						}
					</p>
					<p>
						{
							'Cross-Chain Recovery Program. If you mistakenly send digital assets to the wrong address (a "Cross-Chain Transaction"), recovery is a complex and risky process. ShapeShift is not liable for such Transactions. If you request recovery assistance, ShapeShift may, at its sole discretion and for an assessed fee, attempt to recover your assets.'
						}
					</p>
				</li>

				{/* ix. FOX Tokens */}
				<li>
					<h2 className={'mb-2 text-2xl font-semibold'}>{'FOX Tokens'}</h2>
					<p>
						{
							'FOX Token Basics. We created a standard ERC-20 token on Ethereum called the FOX token (each a "FOX Token"). ShapeShift intends to use FOX Tokens to provide loyalty benefits—such as commission-free trading or enhanced features. Your FOX Token balance appears in your Account, and ShapeShift may impose restrictions on FOX Token interactions.'
						}
					</p>
					<p>
						{
							'How to Obtain FOX Tokens. FOX Tokens are not sold directly. Verified Users may receive FOX Tokens as part of promotions or for completing certain actions including:'
						}
					</p>
					<p className={'ml-4'}>
						{'(i). Successfully passing our verification process;'}
						<br />
						{'(ii). Successfully executing a trade through the Service;'}
						<br />
						{'(iii). Referring a new User to the Service; and'}
						<br />
						{'(iv). Trying new features of the Service and providing related Ideas to ShapeShift.'}
					</p>
					<p>
						{
							'Users may receive differing amounts of FOX Tokens based on promotion details. By providing an Ethereum address, you warrant that you control it. By redeeming FOX Tokens, you consent to receiving related communications.'
						}
					</p>
					<p>
						{
							'Commission-Free Trading. For each FOX Token held, ShapeShift will waive its normal trading commissions (up to US$10 of trade volume per rolling 30-day period). Note that standard Miner Fees still apply. Partial Transactions will have a blended rate.'
						}
					</p>
					<p>
						{
							'The "FOX Back" Program. For a limited time, FOX Tokens will be distributed to Users who complete verification or execute certain trades. Promotion details will be specified before you initiate a qualifying Transaction.'
						}
					</p>
					<p>
						{
							'FOX Fuel. When you exchange a digital asset (a "Qualifying Trade"), your FOX Fuel Balance is determined by your FOX Token holdings divided by 10. Your balance will decrease by any decreases in your holdings or reimbursements made by ShapeShift. Unclaimed FOX Fuel after the specified deadlines will be forfeited.'
						}
					</p>
					<p>
						{
							'FOX Airdrop. The FOX Token Airdrop (July 2021) was conducted via a decentralized smart contract. If you did not receive FOX Tokens from the Airdrop, you were either ineligible or your eligible wallet was not used to check eligibility. ShapeShift is not liable for unsent, unclaimed, or misdirected FOX Tokens.'
						}
					</p>
					<p>
						{
							'No Resale Value. FOX Tokens are provided solely for loyalty purposes and are not intended as an investment. There is no expectation of liquidity or appreciable value.'
						}
					</p>
					<p>
						{
							'Legal Risks. Future regulations may affect the legality or value of FOX Tokens. As FOX Tokens are not formally registered with any regulator, subsequent determinations may restrict use or materially reduce functionality or demand.'
						}
					</p>
					<p>
						{
							'Your Additional Acknowledgments. By redeeming, earning, receiving, or holding a FOX Token, you acknowledge that:'
						}
						<br />
						{
							'(i). FOX Tokens are not an investment and no economic benefit beyond loyalty benefits is expected;'
						}
						<br />
						{'(ii). You will hold FOX Tokens solely for loyalty benefits and personal use, not for resale;'}
						<br />
						{
							'(iii). FOX Token ownership does not confer any equity or voting rights in ShapeShift or the Service; and'
						}
						<br />
						{
							'(iv). There is no expectation of an active market for FOX Tokens, nor will ShapeShift support such a market.'
						}
					</p>
				</li>

				{/* x. Promotional Terms */}
				<li>
					<h2 className={'mb-2 text-2xl font-semibold'}>{'Promotional Terms'}</h2>
					<p>
						{
							'Sponsorship and Eligibility. ShapeShift runs various promotions or giveaways ("ShapeShift Promotions") from time to time. Except as expressly stated in the associated marketing materials, no purchase is necessary to enter or win.'
						}
					</p>
					<p>
						{
							'ShapeShift Promotions are open only to legal residents of the United States and certain other jurisdictions who are 18 years or older. Employees of ShapeShift and their immediate family members are not eligible. ShapeShift may disqualify any participant who tampers with the entry process or violates these Terms.'
						}
					</p>
					<p>
						{
							'Qualification Period. The qualification period, deadlines, and timelines for a Promotion will be clearly stated in the related marketing messaging.'
						}
					</p>
					<p>
						{
							'Entry Procedures. Only verified Users may enter a Promotion. For App-related Promotions, you might be required to download the App, create an Account, or sign in. Additional eligibility procedures will be outlined in the Promotion materials.'
						}
					</p>
					<p>
						{
							"Duties of Participants. By entering a Promotion, you agree that ShapeShift's decisions regarding the Promotion (including disqualifications) are final."
						}
					</p>
					<p>
						{
							'Award and Selection of Winners. ShapeShift will determine how winners (each, a "Winner") are chosen and will specify this in the Promotion details.'
						}
					</p>
					<p>
						{
							'Notification of Winners; Substitution of Awards. Winners will be notified electronically with instructions for redeeming their Award. Failure to act within a reasonable time or undeliverable email may result in forfeiture. No substitution of Awards is permitted.'
						}
					</p>
					<p>
						{
							'Award Limitations. Participation in a Promotion may require identity verification and, if an Award is in the form of a digital asset, ShapeShift will send the Award to your associated digital wallet within 14 days. Each Award generally expires in 30 days if not claimed.'
						}
					</p>
					<p>
						{
							'Miscellaneous Rules. Generally, each Award is limited to one per User or device ID. Duplicate Accounts will not qualify for additional Awards. ShapeShift reserves the right to modify or cancel any Promotion at any time.'
						}
					</p>
					<p>
						{
							'Inquiries or Questions. For any questions regarding a ShapeShift Promotion, please email foxes@foxfoundation.io.'
						}
					</p>
				</li>

				{/* xi. Miscellaneous */}
				<li>
					<h2 className={'mb-2 text-2xl font-semibold'}>{'Miscellaneous'}</h2>
					<p>
						{
							'Indemnification. You shall indemnify ShapeShift and its employees, contractors, agents, officers, and directors against any damages arising from (i) your use of the Service; (ii) any inaccuracies in your representations; (iii) your violation of any third-party rights (including privacy or intellectual property rights); (iv) violation of applicable law; (v) any misleading or false information submitted via your Account; (vi) your willful misconduct; or (vii) any other use of the Service with your Account information.'
						}
					</p>
					<p>
						{
							'Limitation of Liability. In no event will ShapeShift or its affiliates be liable for damages exceeding either the amount you paid ShapeShift for the Service or US$100.00, whichever is greater. This limitation applies regardless of the legal theory and even if ShapeShift was advised of the possibility of such damages.'
						}
					</p>
					<p>
						{
							'Governing Law. These Terms are governed by the internal substantive laws of the United Kingdom. Any arbitration will be conducted in accordance with United Kingdom rules, and you consent to the jurisdiction of UK federal and state courts.'
						}
					</p>
					<p>
						{
							'Arbitration. All disputes arising out of these Terms or your use of the Service shall be resolved by binding arbitration in London, England in English, after an informal resolution process. If you use the Service for commercial purposes, you will bear your own arbitration and attorney fees.'
						}
					</p>
					<p>
						{
							'Assignment. You may not assign or transfer these Terms, or any rights granted herein, without our prior written consent.'
						}
					</p>
					<p>
						{
							'Notice. ShapeShift may notify you via email, mail, or posting on our Website. Certain automated filters may delay or block our emails; ShapeShift is not responsible for such delays.'
						}
					</p>
					<p>
						{
							'Entire Agreement/Severability. These Terms, along with any amendments or additional agreements with ShapeShift regarding the Service, constitute the entire agreement between you and ShapeShift. If any portion is found to be invalid, the remainder will continue in full effect.'
						}
					</p>
					<p>
						{
							'No Waiver. Failure by ShapeShift to enforce any right under these Terms shall not be deemed a waiver of that right.'
						}
					</p>
					<p>
						{
							'Contact. If you have any questions regarding these Terms, please contact us at foxes@foxfoundation.io.'
						}
					</p>
				</li>
			</ol>
		</main>
	);
}

const ListItem = ({children}: {children: React.ReactNode}): ReactNode => {
	return <li className={'list-decimal space-y-4 pl-6'}>{children}</li>;
};
