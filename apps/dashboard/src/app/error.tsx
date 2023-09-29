'use client'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import React from 'react'

export default function error() {
	let retry = () => {
		window.location.reload()
	}

	return (
		<DefaultLayout name="error" title="error">
					<div className="container-fluid">
						<div className="row justify-content-center">
							<div className="text-center">
								<div className="error-500 position-relative">
									<img
										src="/assets/images/error500.png"
										alt=""
										className="img-fluid error-500-img error-img"
									/>
									<h1 className="title text-muted">500</h1>
								</div>
								<div>
									<h4>Internal Server Error!</h4>
									<p className="text-muted w-75 mx-auto">
										Server Error 500. We're not exactly sure what happened, but
										our servers say something is wrong.
									</p>
									<button className="btn btn-success" onClick={retry}>
										Reload
									</button>
								</div>
							</div>
						</div>
					</div>
				
		</DefaultLayout>
	)
}
