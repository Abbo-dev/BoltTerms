import React, { useContext } from 'react';
import { Button } from '@heroui/react';
import { SUBSCRIPTION_PLANS } from '../constants';
import { GeneratedTemplatesContext } from './GeneratedTemplatesContext';

export default function PricingSection() {
  const { userPlan, upgradeToPro } = useContext(GeneratedTemplatesContext);

  return (
    <div className="bg-[#232b38] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#e4e6e8] mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-[#828a96]">
            Start free, upgrade when you need more
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-[#374151] rounded-lg p-8 border border-[#4c5562]">
            <h3 className="text-xl font-bold text-[#e4e6e8] mb-2">
              {SUBSCRIPTION_PLANS.FREE.name}
            </h3>
            <p className="text-3xl font-bold text-[#e4e6e8] mb-6">
              ${SUBSCRIPTION_PLANS.FREE.price}
              <span className="text-sm text-[#828a96] font-normal">/month</span>
            </p>
            <ul className="space-y-3 mb-8">
              {SUBSCRIPTION_PLANS.FREE.features.map((feature, index) => (
                <li key={index} className="flex items-center text-[#e4e6e8]">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="w-full bg-[#4c5562] text-[#e4e6e8] py-2 rounded-md"
              disabled={true}
            >
              Current Plan
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="bg-[#374151] rounded-lg p-8 border border-[#2962ea] relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#2962ea] text-white text-sm py-1 px-3 rounded-full">
              Popular
            </div>
            <h3 className="text-xl font-bold text-[#e4e6e8] mb-2">
              {SUBSCRIPTION_PLANS.PRO.name}
            </h3>
            <p className="text-3xl font-bold text-[#e4e6e8] mb-6">
              ${SUBSCRIPTION_PLANS.PRO.price}
              <span className="text-sm text-[#828a96] font-normal">/month</span>
            </p>
            <ul className="space-y-3 mb-8">
              {SUBSCRIPTION_PLANS.PRO.features.map((feature, index) => (
                <li key={index} className="flex items-center text-[#e4e6e8]">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="w-full bg-[#2962ea] text-[#e4e6e8] py-2 rounded-md hover:bg-[#2454c9]"
              onPress={upgradeToPro}
              disabled={userPlan === 'PRO'}
            >
              {userPlan === 'PRO' ? 'Current Plan' : 'Upgrade to Pro'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
