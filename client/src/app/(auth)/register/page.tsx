'use client'
import PageContainer from '@/components/PageContainer'
import { homeConfig } from '@/utils/config'
import { useTypedSelector, useUserActions } from '@/hooks'
import { FormEvent, useEffect, useState } from 'react'
import { UserCredentials } from '@/interfaces'
import FormContainer from '@/components/FormContainer'
import Message from '@/components/Message'
import Loader from '@/components/Loader'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Link from 'next/link'

const RegisterPage = () => {
  const initialCredentials = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const { register } = useUserActions()
  const { loading, error } = useTypedSelector(state => state.userRegister)

  const [credentials, setCredentials] = useState<UserCredentials>(initialCredentials)
  const [message, setMessage] = useState<string | null | string[]>(error)

  useEffect(() => {
    setMessage(error)
  }, [error])

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { name, email, password, confirmPassword } = credentials

    if (name.length < 1 || email.length < 1 || password.length < 1 || confirmPassword.length < 1) {
      setMessage('All fields are required.')

      return null
    }

    if (password && password !== confirmPassword) {
      setMessage('Passwords do not match')

      return null
    }

    register(name, email, password)
  }
  return (
    <PageContainer seoProps={{ ...homeConfig }}>
      <FormContainer>
        <h1>Sign Up</h1>

        {message && (
          <Message variant="danger">{Array.isArray(message) ? message[0] : message}</Message>
        )}
        {loading && <Loader />}

        <Form onSubmit={onSubmitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={credentials.name}
              onChange={e => setCredentials({ ...credentials, name: e.target.value })}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="py-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={credentials.email}
              onChange={e => setCredentials({ ...credentials, email: e.target.value })}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={credentials.password}
              onChange={e => setCredentials({ ...credentials, password: e.target.value })}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="py-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={credentials.confirmPassword}
              onChange={e =>
                setCredentials({
                  ...credentials,
                  confirmPassword: e.target.value
                })
              }
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="my-1">
            Register
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Have an Account? <Link href="/login">Login</Link>
          </Col>
        </Row>
      </FormContainer>
    </PageContainer>
  )
}

export default RegisterPage
