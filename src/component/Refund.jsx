import { Section } from "./PolicyPage";
import BackToHome from "./BackHome";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-[#181e2b] text-[#e4e6e8] py-8 px-4">
      <div className="max-w-3xl mx-auto bg-[#374151] rounded-xl p-6 mt-10 md:p-8">
        <div className="border-b border-[#4c5562] pb-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Refund Policy</h1>
          <p className="text-[#828a96] mt-2">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-6 text-sm md:text-base">
          <Section title="1. No Refunds for Digital Services">
            <p>
              All purchases made through TC Gen are final and non-refundable.
              Our product delivers instant access to digital content (custom
              legal documents), which cannot be returned or revoked once
              generated. For this reason, we do not offer refunds,
              cancellations, or exchanges after a purchase is completed.
            </p>
          </Section>

          <Section title="2. Instant Delivery">
            <p>
              Upon successful payment, your Terms & Conditions and related legal
              documents are immediately created and made available for download
              or copy. Because the full value of our service is delivered
              instantly, refund requests cannot be honored after delivery.
            </p>
          </Section>

          <Section title="3. Errors or Technical Issues">
            <p>
              If you experience a technical issue preventing you from receiving
              your document, please contact our support team within{" "}
              <span className="text-[#2962ea] font-semibold">48 hours</span> of
              purchase. We will verify your case and, if applicable, provide a
              corrected document or new access at no additional charge.
            </p>
          </Section>

          <Section title="4. Chargebacks & Disputes">
            <p>
              Initiating a chargeback after accessing or downloading our digital
              product is considered a violation of these terms. We reserve the
              right to dispute such claims and provide full evidence of delivery
              to the payment provider.
            </p>
          </Section>

          <Section title="5. Policy Updates">
            <p>
              We may update this Refund Policy from time to time to reflect
              changes in our service or applicable laws. Continued use of TC Gen
              after such changes constitutes acceptance of the revised policy.
            </p>
          </Section>

          <div className="pt-4 border-t border-[#4c5562]">
            <p className="text-[#828a96] text-sm">
              Questions or issues with your order? Reach out to us at{" "}
              <span className="text-[#2962ea]">support@tcgen.app</span>.
            </p>
          </div>
        </div>
      </div>
      <BackToHome />
    </div>
  );
};

export default RefundPolicy;
