/* eslint-env node */
module.exports = {
    extends: ['stylelint-config-recommended-scss', 'stylelint-config-recess-order', 'stylelint-config-recommended-vue'],
    plugins: ['stylelint-prettier', 'stylelint-scss'],
    rules: {
        'prettier/prettier': true,
        'selector-pseudo-element-no-unknown': null,
        'no-descending-specificity': null,
        'selector-not-notation': null,
        'import-notation': null,
        'function-no-unknown': null,
        'selector-class-pattern': null,
        'property-no-unknown': [
            true,
            {
                ignoreSelectors: [':export'],
            },
        ],
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['deep', 'global', 'export'],
            },
        ],
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'function', 'if', 'each', 'include', 'mixin', 'extend', 'use'],
            },
        ],
        'no-empty-source': null,
        'string-quotes': null,
        'named-grid-areas-no-invalid': null,
        'font-family-no-missing-generic-family-keyword': null,
        'rule-empty-line-before': [
            'always',
            {
                ignore: ['after-comment', 'first-nested'],
            },
        ],
        'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
        'order/order': [
            [
                'dollar-variables',
                'custom-properties',
                'at-rules',
                'declarations',
                {
                    type: 'at-rule',
                    name: 'supports',
                },
                {
                    type: 'at-rule',
                    name: 'media',
                },
                'rules',
            ],
            { severity: 'warning' },
        ],
        'media-feature-range-notation': 'prefix',
    },
};
