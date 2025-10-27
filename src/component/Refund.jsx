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
          <Section title="1. Overview">
            <p>
              At <strong>Bolt Terms</strong>, we want every customer to be
              satisfied with their purchase. Because our products are digital
              legal-document generators, delivery occurs instantly after
              payment. However, in accordance with Paddle’s Buyer Terms, we
              offer a <strong>14-day refund policy</strong> from the date of
              purchase.
            </p>
          </Section>

          <Section title="2. Eligibility for Refunds">
            <p>
              You may request a refund within 14 days of your transaction if you
              are not satisfied or experience issues accessing your generated
              documents. To request a refund, contact our support team with your
              order details and the email used for purchase.
            </p>
          </Section>

          <Section title="3. Technical Issues">
            <p>
              If a technical problem prevents you from receiving your document,
              please reach out within 48 hours. We’ll verify the issue and
              either resolve it or issue a refund if appropriate.
            </p>
          </Section>

          <Section title="4. Chargebacks & Disputes">
            <p>
              Filing a chargeback without contacting us first may result in your
              account being suspended. We always aim to resolve refund requests
              directly and fairly.
            </p>
          </Section>

          <Section title="5. Policy Updates">
            <p>
              Bolt Terms may update this Refund Policy periodically. Continued
              use of our services after an update means you accept the revised
              version.
            </p>
          </Section>

          <div className="pt-4 border-t border-[#4c5562]">
            <p className="text-[#828a96] text-sm">
              For refund requests or questions, please contact us at{" "}
              <span className="text-[#2962ea]">support@boltterms.com</span>.
            </p>
          </div>
        </div>
      </div>
      <BackToHome />
    </div>
  );
};

export default RefundPolicy;
