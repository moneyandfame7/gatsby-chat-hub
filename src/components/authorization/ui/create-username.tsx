import React, { FC } from 'react'
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next'
import { Button, Input, Text, Tooltip } from '@chakra-ui/react'

interface CreateUsernameProps {
  inputError: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  submit: () => void
}

export const CreateUsername: FC<CreateUsernameProps> = ({ inputError, handleChange, submit }) => {
  const { t } = useTranslation()
  return (
    <>
      <Text fontSize="3xl" fontWeight={600}>
        <Trans i18nKey="authorization.createUsername" />
      </Text>
      <Input placeholder={t('authorization.enterUsername') as string} onChange={handleChange} />
      <Tooltip hasArrow label={inputError}>
        <Button width="100%" isDisabled={!!inputError} onClick={submit}>
          <Trans i18nKey="common.save" />
        </Button>
      </Tooltip>
    </>
  )
}
