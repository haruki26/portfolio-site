import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'
import Glass from '@/components/ui/Glass'
import { useContactForm } from '../../hooks'
import Input from './Input'

const ContactForm: React.FC = () => {
  const { form } = useContactForm()

  return (
    <Glass>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="flex flex-col gap-5"
      >
        <div className="flex w-full gap-3">
          <div className="flex-1">
            <form.Field name="lastName">
              {(field) => (
                <Input
                  formValue={{
                    name: field.name,
                    type: 'text',
                    onChange: (e) => field.handleChange(e.target.value),
                    value: field.state.value,
                    errorMessage: field.state.meta.errors[0]?.message,
                  }}
                  labelText="LastName"
                  inputMode="input"
                />
              )}
            </form.Field>
          </div>
          <div className="flex-1">
            <form.Field name="firstName">
              {(field) => (
                <Input
                  formValue={{
                    name: field.name,
                    type: 'text',
                    onChange: (e) => field.handleChange(e.target.value),
                    value: field.state.value,
                    errorMessage: field.state.meta.errors[0]?.message,
                  }}
                  labelText="FirstName"
                  inputMode="input"
                />
              )}
            </form.Field>
          </div>
        </div>
        <form.Field name="email">
          {(field) => (
            <Input
              formValue={{
                name: field.name,
                type: 'email',
                onChange: (e) => field.handleChange(e.target.value),
                value: field.state.value,
                errorMessage: field.state.meta.errors[0]?.message,
              }}
              labelText="Email"
              inputMode="input"
            />
          )}
        </form.Field>
        <form.Field name="message">
          {(field) => (
            <Input
              formValue={{
                name: field.name,
                type: 'text',
                onChange: (e) => field.handleChange(e.target.value),
                value: field.state.value,
                errorMessage: field.state.meta.errors[0]?.message,
              }}
              labelText="Message (Max 500)"
              inputMode="textArea"
            />
          )}
        </form.Field>
        <Divider className="my-3 to-accent/50" />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              isDisabled={!canSubmit || isSubmitting}
              className="bg-primary-100 text-xl tracking-widest transition-colors duration-150 disabled:bg-primary-300/80"
            >
              Submit
            </Button>
          )}
        </form.Subscribe>
      </form>
    </Glass>
  )
}

export default ContactForm
