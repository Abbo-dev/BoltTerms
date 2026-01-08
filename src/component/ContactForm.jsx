import { useForm, ValidationError } from "@formspree/react";
import { Button, Form, Input, Textarea } from "@heroui/react";

export default function ContactForm() {
  
  const [state, handleSubmit] = useForm("xbpvzlng");

  if (state.succeeded) {
    return (
      <div className="bg-[#232b38] border border-[#3a4556] p-10 rounded-xl text-center shadow-2xl">
        <h2 className="text-2xl font-bold text-[#e4e6e8] mb-2">
          Message Sent! 🚀
        </h2>
        <p className="text-gray-400 mb-6">
          Thanks for reaching out. We'll get back to you at{" "}
          <span className="text-[#2962ea]">support@boltterms.com</span> shortly.
        </p>
        <Button
          className="btn-primary px-6 py-2"
          onPress={() => window.location.reload()}
        >
          Send Another
        </Button>
      </div>
    );
  }

  return (
    <div id="contact" className="max-w-4xl mx-auto w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#e4e6e8] mb-2">
          Send Us a Message
        </h2>
        <p className="text-gray-400">
          Can't find what you're looking for? Fill out the form below.
        </p>
      </div>

      <Form
        onSubmit={handleSubmit}
        className="bg-[#232b38] border border-[#3a4556] p-6 sm:p-8 rounded-xl space-y-4 hover:shadow-lg hover:shadow-[#2962ea]/40 max-w-5xl mx-auto transition-all"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-3">
          {/* NAME FIELD */}
          <div className="w-full">
            <Input
              id="name"
              name="name"
              label="Name"
              type="text"
              isRequired
              labelPlacement="inside"
            />

            {/* Fixed error slot */}
            <div className="h-4 mt-1">
              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
                className="text-red-500 text-xs  m-0 p-0"
              />
            </div>
          </div>

          {/* EMAIL FIELD */}
          <div className="w-full">
            <Input
              id="email"
              name="email"
              label="Email"
              type="email"
              isRequired
              labelPlacement="inside"
            />

            {/* Fixed error slot */}
            <div className="h-4 mt-1">
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-red-500 text-xs"
              />
            </div>
          </div>
        </div>

        {/* MESSAGE FIELD */}
        <div className="mt-3 w-full">
          <Textarea
            id="message"
            name="message"
            label="How can we help?"
            placeholder="Describe your issue or question..."
            labelPlacement="inside"
            minRows={5}
            className="w-full "
            classNames={{
              inputWrapper: " border border-[#3a4556]",
              textarea: "resize-none",
              label: "text-[#9CA3AF]",
              placeholder: "text-[#9CA3AF]",
              input: "text-[#e4e6e8]",
              textareaWrapper: "border border-[#3a4556]",
            }}
          />

          {/* Fixed error slot */}
          <div className="h-4 mt-1">
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
              className="text-red-500 text-xs"
            />
          </div>
        </div>

        <div className="flex justify-end w-full">
          <Button
            type="submit"
            disabled={state.submitting}
            className="btn-primary px-8 py-3"
          >
            {state.submitting ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
