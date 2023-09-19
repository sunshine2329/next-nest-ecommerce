'use client'
import { NextPage } from 'next'
import PageContainer from '@/components/PageContainer'
import { homeConfig } from '@/utils'
import FormContainer from '@/components/FormContainer'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Message from '@/components/Message'
import Loader from '@/components/Loader'
import { useTypedSelector, useUserActions } from '@/hooks'

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login } = useUserActions()
  const { loading, error } = useTypedSelector(state => state.userLogin)

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!error || (email.length > 0 && password.length > 0)) {
      login(email, password)
    }
  }
  return (
    <PageContainer seoProps={{ ...homeConfig }}>
      <FormContainer>
        <h1>Sign In</h1>

        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={onSubmitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="py-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New Customer? <Link href="/register">Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </PageContainer>
  )
}
export default LoginPage
