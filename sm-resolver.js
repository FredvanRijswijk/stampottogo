import * as EssentialSlices from 'essential-slices/src/slices'
import * as Custom from './slices/index'

const __allSlices = {  ...EssentialSlices, ...Custom }

const NotFound = ({ sliceName }) => {
	console.log(`[sm - resolver] component "${sliceName}" not found.`)
	return process.env.NODE_ENV !== 'production' ? <div>component "{sliceName}" not found.</div> : <div />
}

export default ({ sliceName, i }) => {
	return __allSlices[sliceName] ? __allSlices[sliceName] : () => <NotFound sliceName={sliceName} />
}

  