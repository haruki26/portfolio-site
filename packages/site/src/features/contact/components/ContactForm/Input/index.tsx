import { CircleAlert } from 'lucide-react'
import LabelWithIcon from '@/components/layout/LabelWithIcon'
import { cn } from '@/libs/cn'

interface Props {
  formValue: {
    type: React.InputHTMLAttributes<HTMLInputElement>['type']
    name: string
    value: string
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void
    errorMessage?: string
  }
  isRequire?: boolean
  labelText: string
  inputMode: 'input' | 'textArea'
}

const Input: React.FC<Props> = ({
  formValue,
  isRequire = true,
  labelText,
  inputMode,
}) => {
  const args: React.InputHTMLAttributes<
    HTMLInputElement | HTMLTextAreaElement
  > = {
    id: formValue.name,
    name: formValue.name,
    value: formValue.value,
    onChange: (e) => formValue.onChange(e),
    placeholder: ' ',
    required: isRequire,
    className:
      'peer w-full border-b-2 border-b-secondary-100 px-2 text-lg focus:bg-slate-800/80 transition-colors duration-150',
  }

  return (
    <div className="relative mt-4 flex w-full flex-col gap-0.5">
      <label htmlFor={formValue.name} className="sr-only">
        {labelText}
      </label>
      {inputMode === 'input' ? (
        <input type={formValue.type} {...args} />
      ) : (
        <textarea {...args} />
      )}
      <span
        aria-hidden={true}
        className={cn(
          'pointer-events-none absolute top-0 left-0 pl-1 font-orbitron',
          'transform transition duration-150',
          'peer-focus:-translate-y-6 peer-[:not(:placeholder-shown)]:-translate-y-6',
        )}
      >
        {labelText}
      </span>
      {formValue.errorMessage && (
        <LabelWithIcon
          className="pt-1.5 pl-0.5 text-red-400"
          Icon={() => <CircleAlert className="size-4" />}
        >
          <span className="text-sm">{formValue.errorMessage}</span>
        </LabelWithIcon>
      )}
    </div>
  )
}

export default Input
