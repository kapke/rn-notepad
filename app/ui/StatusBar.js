/*
 * @flow
 */

import * as React from 'react'
import { Platform, StatusBarIOS, View } from 'react-native'
import { startWith, pluck } from 'rxjs/operators'
import { fromEvent } from 'rxjs/observable/fromEvent'
import { of } from 'rxjs/observable/of'
import { connect } from 'react-redux'
import { uiState } from './uiSelectors'

export const statusBarHeight$ = () =>
    Platform.OS === 'ios'
        ? fromEvent(StatusBarIOS, 'statusBarFrameDidChange').pipe(
              pluck('frame', 'height'),
              startWith(20),
          )
        : of(0)

export const StatusBarPlaceholder = ({ statusBarHeight }) => (
    <View style={{ height: statusBarHeight }} />
)

export const StatusBarPlaceholderContainer = connect(uiState)(
    StatusBarPlaceholder,
)
