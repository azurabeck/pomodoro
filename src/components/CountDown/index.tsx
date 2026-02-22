import { useTaskContext } from '../../contexts/TaskContext/TaskContextHook'
import styles from './styles.module.css'

export function CountDown() {

    const { state } = useTaskContext();

    return (
        <div className={styles.container}>
            { state.formattedSecondsRemaining ? state.formattedSecondsRemaining : "00:00" }
        </div>
    )
}