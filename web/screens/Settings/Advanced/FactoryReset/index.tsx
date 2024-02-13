import { Button } from '@janhq/joi'

import { useSetAtom } from 'jotai'

import { twMerge } from 'tailwind-merge'

import styles from '../../settings.module.scss'

import ModalValidation, { modalValidationAtom } from './ModalConfirmReset'

const FactoryReset = () => {
  const setModalValidation = useSetAtom(modalValidationAtom)

  return (
    <div className={twMerge('first:pt-0 last:border-none', styles.listItem)}>
      <div className={styles.listItemWrapper}>
        <h6 className={styles.listItemTitle}>Reset to Factory Default</h6>
        <p className={styles.listItemDescription}>
          Reset the application to its original state, deleting all your usage
          data, including model customizations and conversation history. This
          action is irreversible and recommended only if the application is in a
          corrupted state.
        </p>
      </div>
      <Button
        size="small"
        theme="destructive"
        variant="soft"
        onClick={() => setModalValidation(true)}
      >
        Reset
      </Button>
      <ModalValidation />
    </div>
  )
}

export default FactoryReset
