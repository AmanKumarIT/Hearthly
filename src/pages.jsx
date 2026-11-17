import React from 'react'
import { Hero, Trust, Neighbourhoods, Properties, Audience, Process, Calculator, Team, Reviews, Resources, Faq, Contact } from './sections.jsx'

// Each navbar item is its own page. Change what a page shows here.
export const HomePage = () => <><Hero /><Trust /><Neighbourhoods /></>
export const PropertiesPage = () => <Properties />
export const HowWeHelpPage = () => <Audience />
export const HowItWorksPage = () => <Process />
export const CalculatorPage = () => <Calculator />
export const OurPeoplePage = () => <><Team /><Reviews /></>
export const ResourcesPage = () => <><Resources /><Faq /></>
export const ContactPage = () => <Contact />
