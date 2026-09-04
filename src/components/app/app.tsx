import { useState } from 'react';
import type { CSSProperties } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	type ArticleStateType,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [settings, setSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const handleApplySettings = (newSettings: ArticleStateType) => {
		setSettings(newSettings);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': settings.fontFamilyOption.value,
					'--font-size': settings.fontSizeOption.value,
					'--font-color': settings.fontColor.value,
					'--container-width': settings.contentWidth.value,
					'--bg-color': settings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm applySettings={handleApplySettings} />
			<Article />
		</main>
	);
};
