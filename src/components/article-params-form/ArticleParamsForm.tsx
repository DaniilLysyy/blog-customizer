import React, { useRef, useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';

import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	OptionType,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useCloseForm } from '../useCloseForm';

type ArticleParamsFormProps = {
	applySettings: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	applySettings,
}: ArticleParamsFormProps) => {
	const [formIsOpened, setFormIsOpened] = useState(false);
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const refForm = useRef<HTMLFormElement>(null);

	const {
		backgroundColor,
		contentWidth,
		fontColor,
		fontFamilyOption,
		fontSizeOption,
	} = formSettings;

	const toggleForm = () => {
		setFormIsOpened((opened) => !opened);
	};

	const updateFormSettings = (newSettings: Partial<ArticleStateType>) => {
		setFormSettings((prev) => ({ ...prev, ...newSettings }));
	};

	const handleFontChange = (newValue: OptionType) =>
		updateFormSettings({ fontFamilyOption: newValue });

	const handleFontSizeChange = (newValue: OptionType) =>
		updateFormSettings({ fontSizeOption: newValue });

	const handleFontColorChange = (newValue: OptionType) =>
		updateFormSettings({ fontColor: newValue });

	const handleBGColorChange = (newValue: OptionType) =>
		updateFormSettings({ backgroundColor: newValue });

	const handleContentWidthChange = (newValue: OptionType) =>
		updateFormSettings({ contentWidth: newValue });

	const resetFormSettings = () => {
		setFormSettings(defaultArticleState);
		applySettings(defaultArticleState);
		toggleForm();
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		applySettings(formSettings);
		toggleForm();
	};

	useCloseForm({
		isOpen: formIsOpened,
		refForm: refForm,
		onClose: () => setFormIsOpened(false),
	});

	return (
		<>
			<ArrowButton isOpen={formIsOpened} onClick={toggleForm} />

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: formIsOpened,
				})}>
				<form className={styles.form} onSubmit={handleSubmit} ref={refForm}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='шрифт'
						selected={fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontChange}
					/>

					<RadioGroup
						name='radioGroupName'
						options={fontSizeOptions}
						selected={fontSizeOption}
						onChange={handleFontSizeChange}
						title='размер шрифта'
					/>

					<Select
						title='цвет шрифта'
						onChange={handleFontColorChange}
						selected={fontColor}
						options={fontColors}
					/>

					<Separator />

					<Select
						title='цвет фона'
						onChange={handleBGColorChange}
						selected={backgroundColor}
						options={backgroundColors}
					/>

					<Select
						title='ширина контента'
						onChange={handleContentWidthChange}
						selected={contentWidth}
						options={contentWidthArr}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetFormSettings}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
