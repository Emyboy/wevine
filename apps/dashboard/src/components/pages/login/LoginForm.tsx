import React, { useState } from 'react'
import { HiEye, HiEyeSlash } from 'react-icons/hi2'
import { metadata } from 'variables'

type Props = {}

export default function LoginForm({}: Props) {
	const [showPassword, setShowPassword] = useState(false)
	return (
		<div className="p-lg-5 p-4">
			<div>
				<h5 className="text-primary">Register Account</h5>
				<p className="text-muted">
					Get your Free {metadata.title} account now.
				</p>
			</div>

			<div className="mt-4">
				<form className="needs-validation">
					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email <span className="text-danger">*</span>
						</label>
						<input
							type="email"
							className="form-control"
							id="email"
							placeholder="Enter email address"
							required
						/>
						<div className="invalid-feedback">Please enter email</div>
					</div>

					<div className="mb-3">
						<label className="form-label" htmlFor="password-input">
							Password
						</label>
						<div className="position-relative auth-pass-inputgroup">
							<input
								type={showPassword ? 'text' : 'password'}
								className="form-control pe-5 password-input"
								placeholder="Enter password"
								id="password-input"
								aria-describedby="passwordInput"
								required
							/>
							<button
								className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon h-100"
								type="button"
								id="password-addon"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<HiEyeSlash className="align-middle" />
								) : (
									<HiEye className="align-middle" />
								)}
							</button>
							<div className="invalid-feedback">Please enter password</div>
						</div>
					</div>

					{/* <div className="mb-4">
						<p className="mb-0 fs-12 text-muted fst-italic">
							By registering you agree to the Velzon{' '}
							<a
								href="#"
								className="text-primary text-decoration-underline fst-normal fw-medium"
							>
								Terms of Use
							</a>
						</p>
					</div> */}

					<div className="mt-4">
						<button className="btn btn-success w-100" type="submit">
							Sign Up
						</button>
					</div>

					{/* <div className="mt-4 text-center">
						<div className="signin-other-title">
							<h5 className="fs-13 mb-4 title text-muted">
								Create account with
							</h5>
						</div>

						<div>
							<button
								type="button"
								className="btn btn-primary btn-icon waves-effect waves-light"
							>
								<i className="ri-facebook-fill fs-16"></i>
							</button>
							<button
								type="button"
								className="btn btn-danger btn-icon waves-effect waves-light"
							>
								<i className="ri-google-fill fs-16"></i>
							</button>
							<button
								type="button"
								className="btn btn-dark btn-icon waves-effect waves-light"
							>
								<i className="ri-github-fill fs-16"></i>
							</button>
							<button
								type="button"
								className="btn btn-info btn-icon waves-effect waves-light"
							>
								<i className="ri-twitter-fill fs-16"></i>
							</button>
						</div>
					</div> */}
				</form>
			</div>

			<div className="mt-5 text-center">
				<p className="mb-0">
					Are you a client ?{' '}
					<a
						href="auth-signin-cover.html"
						className="fw-semibold text-primary text-decoration-underline"
					>
						{' '}
						login here
					</a>{' '}
				</p>
			</div>
		</div>
	)
}
